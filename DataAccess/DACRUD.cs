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
        public Task<int> Insert<T>(T item);
        public Task<List<int>> InsertMany<T>(List<T> items, string table, List<string> columns);
        public Task<List<T>> GetAll<T>();
    }

    public class DALCRUD : ICRUD
    {
        public readonly Requestor requestor;
        public DALCRUD()
        {
            requestor = new Requestor("PorteFolio", "Data Source=(localdb)\\mssqllocaldb;Initial Catalog=PorteFolio.Database;");
        }

        public async Task<int> DeleteById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<T>> GetAll<T>()
        {
            return requestor.Select<T>("");
        }

        public async Task<T> GetById<T>(int id)
        {
            return requestor.Select<T>("").First();
        }

        public async Task<int> Update<T>(T item)
        {
            throw new NotImplementedException();
        }
        public async Task<int> Insert<T>(T item)
        {
            return requestor.Insert<T>("", new List<T> { item });
        }

        public async Task<List<int>> InsertMany<T>(List<T> items, string table,List<string> columns)
        {
            return await requestor.ExecuteStoredText<T>(RequestSimple<T>(items,table,columns));
        }

        public async Task<List<T>> Execute<T>(string name, object param = null)
        {
            return requestor.ExecuteStoredProcedure<T>(name, param);
        }

        private static string RequestSimple<T>(List<T> items, string table, List<string> columns, List<string> values = null)
        {
            if (!items.Any())
            {
                return string.Empty;
            };

            int totalLine = items.Count();
            int cptLine = 0;
            int countRow = 0;
            StringBuilder request = new StringBuilder();

            string insertLine = $"INSERT INTO {table} ({string.Join(",", columns.ToArray())}) VALUES ";

            request.AppendLine(insertLine);

            foreach (T item in items)
            {

                List<string> columnsValues = values != null ? values : columns;

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
                    request.AppendLine(insertLine);
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
