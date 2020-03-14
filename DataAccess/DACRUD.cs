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

namespace DataAccess
{
    public interface ICRUD
    {
        public Task<T> GetById<T>(int id);
        public Task<int> DeleteById(int id);
        public Task<int> Update<T>(T item);
        Task<int> Insert<T>(T item, string table, List<string> columns);
        public Task<List<int>> InsertMany<T>(List<T> items, string table, List<string> columns);
        public Task<List<T>> GetAll<T>(string table, List<string> tableColumns);
    }

    public class DALCRUD : ICRUD
    {
        public enum enumAction
        {
            INSERT = 1, UPDATE,SELECT, DELETE
        }

        public readonly Requestor requestor;
        public DALCRUD()
        {
            requestor = new Requestor("PorteFolio", @"Data Source=192.168.0.11;Initial Catalog=PorteFolio.Database;Integrated Security=True;User Id=ULTIMATE-OMEGA\omega;Password=linkofgwada");
            //requestor = new Requestor("PorteFolio", @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=PorteFolio.Database;Integrated Security=True;Connect Timeout=60;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
        }

        public async Task<int> DeleteById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<T>> GetAll<T>(string table, List<string> tableColumns)
        {
            return requestor.Select<T>($"SELECT {string.Join(",", tableColumns.ToArray())} FROM {table}");
        }

        public async Task<T> GetById<T>(int id)
        {
            return requestor.Select<T>("").First();
        }

        public async Task<int> Update<T>(T item)
        {
            throw new NotImplementedException();
        }
        public async Task<int> Insert<T>(T item, string table, List<string> columns)
        {
            try {
            return await requestor.ExecuteStoredText<T>(RequestSimple<T>(enumAction.INSERT, new List<T> { item }, table, columns));
            } catch(Exception e){
                throw e;
            }            
        }

        public async Task<List<int>> InsertMany<T>(List<T> items, string table,List<string> columns)
        {
            return await requestor.ExecuteStoredText<T>(RequestSimple<T>(enumAction.INSERT,items,table,columns));
        }

        public async Task<List<T>> Execute<T>(string name, object param = null)
        {
            return requestor.ExecuteStoredProcedure<T>(name, param);
        }

        private static string RequestSimple<T>(enumAction action,List<T> items, string table, List<string> tableColumns, List<string> classAttribut = null)
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
                    requestLine = $"INSERT INTO {table} ({string.Join(",", tableColumns.ToArray())}) OUTPUT INSERTED.* VALUES ";
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
                            return GetValueProperty(propertyInfo, propertyInfo.GetValue(item, null), item);
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

        private static dynamic GetValueProperty(PropertyInfo property, object val, dynamic item)
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
