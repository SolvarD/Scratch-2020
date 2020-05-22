using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System.Linq;

namespace DataAccess
{
    public interface ICRUD
    {
        public Task<T> GetOneById<T>(int id);
        public Task<List<T>> GetManyById<T>(int id, string column, List<string> tableColumns);
        public Task<int> DeleteById(int id, string column);
        public T Update<T>(string column, int id, T item, List<string> tableColumns);
        public T Insert<T>(T item,List<string> columns);
        public List<T> InsertMany<T>(List<T> items, List<string> columns);
        public Task<List<T>> GetAll<T>(List<string> tableColumns);
    }

    public class DALCRUD : ICRUD
    {
        public enum enumAction
        {
            INSERT = 1, UPDATE, SELECT, DELETE
        }
        public string _table = string.Empty;
        public readonly Requestor requestor;
        public DALCRUD(Requestor _requestor, string table)
        {
            requestor = _requestor;
            _table = table;
        }

        public async Task<int> DeleteById(int id, string column)
        {
            return requestor.Delete($"Delete from {_table} OUTPUT DELETED.* where {column}={id}");
        }

        public async Task<List<T>> GetAll<T>(List<string> tableColumns)
        {
            return requestor.Select<T>($"SELECT {string.Join(",", tableColumns.ToArray())} FROM {_table}");
        }

        public async Task<T> GetOneById<T>(int id)
        {
            return requestor.Select<T>("").First();
        }
        public async Task<List<T>> GetManyById<T>(int id, string column,List<string> tableColumns)
        {
            return requestor.Select<T>($"SELECT {string.Join(",", tableColumns.ToArray())} FROM {_table} Where {column}={id}");
        }
        public T Update<T>(string column, int id, T item, List<string> tableColumns)
        {
            StringBuilder request = new StringBuilder();
            request.Append($"Update {_table} set ");
            foreach (string tableColumn in tableColumns)
            {
                PropertyInfo propertyInfo = item.GetType().GetProperty(Regex.Replace(tableColumn, @"[\[,\]]", string.Empty));
                var value = GetValueProperty(propertyInfo, propertyInfo.GetValue(item, null));
                request.Append($"{tableColumn}={ value }, ");
            }
            request.Remove(request.Length - 2,2);
            request.Append($" OUTPUT inserted.* Where {column}={id} ");

            return requestor.Select<T>(request.ToString()).First();
        }
        public T Insert<T>(T item, List<string> columns)
        {
            try
            {
                return requestor.ExecuteStoredText<T>(RequestSimple<T>(enumAction.INSERT, new List<T> { item }, columns)).First();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<T> InsertMany<T>(List<T> items, List<string> columns)
        {
            return requestor.ExecuteStoredText<T>(RequestSimple<T>(enumAction.INSERT, items, columns));
        }

        public async Task<List<T>> Execute<T>(string name, object param = null)
        {
            return requestor.ExecuteStoredProcedure<T>(name, param);
        }

        private string RequestSimple<T>(enumAction action, List<T> items, List<string> tableColumns, List<string> classAttribut = null)
        {
            if (!items.Any())
            {
                return string.Empty;
            };

            int totalLine = items.Count();
            int cptLine = 0;
            int countRow = 0;
            StringBuilder request = new StringBuilder();

            string requestLine = string.Empty;

            switch (action)
            {
                case enumAction.INSERT:
                    requestLine = $"INSERT INTO {_table} ({string.Join(",", tableColumns.ToArray())}) OUTPUT INSERTED.* VALUES ";
                    break;
                    //case enumAction.SELECT:
                    //    requestLine = $"SELECT {string.Join(",", tableColumns.ToArray())} FROM {table}";
                    //    break;
            }


            request.AppendLine(requestLine);

            foreach (T item in items)
            {

                List<string> columnsValues = classAttribut != null ? classAttribut : tableColumns;

                var strLine = $"(" +
                        string.Join(", ", columnsValues.Select(g =>
                        {
                            PropertyInfo propertyInfo = item.GetType().GetProperty(Regex.Replace(g, @"[\[,\]]", string.Empty));
                            return GetValueProperty(propertyInfo, propertyInfo.GetValue(item, null));
                        }).ToArray())
                    + ")";

                cptLine++;
                countRow++;
                if (countRow < 900)
                {
                    request.AppendLine(strLine + ",");
                }
                else
                {
                    request.AppendLine(strLine + ";");
                    request.AppendLine(requestLine);
                    countRow = 0;
                }
            }

            request.Remove(request.Length - 3, 3);
            request.AppendLine(";");

            return request.ToString();
        }

        private static dynamic GetValueProperty(PropertyInfo property, object val)
        {

            if (val == null || val.ToString() == string.Empty) { return "NULL"; }

            if (val.ToString() == "@@IDENTITY")
            {
                return val.ToString();
            }

            switch (GetNullableUnderlyingTypeOrTypeIfNonNullable(property.PropertyType).Name)
            {
                case "Int32":
                    //if (property.Name == "TariffBaseRubricIdByCode")
                    return (int)val;
                case "String":
                    return $"'{((string)val).Trim()}'";
                case "Decimal":
                    return $"cast('{((decimal)val).ToString().Replace(',', '.') }' as float)";
                case "DateTime":
                    return $"'{((DateTime)val).ToString("yyyy/MM/dd HH:mm:ss.000")}'";
                case "Boolean":
                    return Convert.ToInt32((bool)val);
                default:
                    return "";
            }
        }
        private static Type GetNullableUnderlyingTypeOrTypeIfNonNullable(Type possiblyNullableType)
        {
            var nullableType = Nullable.GetUnderlyingType(possiblyNullableType);

            bool isNullableType = nullableType != null;

            if (isNullableType)
                return nullableType;
            else
                return possiblyNullableType;
        }
    }
}
