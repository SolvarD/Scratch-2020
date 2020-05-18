using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace DataAccess
{
    public class Requestor
    {
        public string connexionName = string.Empty;
        private bool checkProd = false;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public Requestor(string databaseName)
        {
            connexionName = databaseName;
            _connectionString = ConfigurationManager.ConnectionStrings[ConnexionName].ConnectionString;
            using (var connection = new SqlConnection(_connectionString))
            {
                List<string> prodAccount = new List<string> { };
                checkProd = prodAccount.Any(g => connection.ConnectionString.Contains(g));
            }
        }
        public Requestor(string connexionName, string connexionString)
        {
            this.connexionName = connexionName;
            _connectionString = connexionString;
            using (var connection = new SqlConnection(_connectionString))
            {
                List<string> prodAccount = new List<string> { };
                checkProd = prodAccount.Any(g => connection.ConnectionString.Contains(g));
            }
        }

        public Requestor(IConfiguration configuration, string connexionName)
        {
            _configuration = configuration;
            this.connexionName = connexionName;
            _connectionString = configuration[$"ConnectionStrings:{connexionName}"];
            using (var connection = new SqlConnection(_connectionString))
            {
                List<string> prodAccount = new List<string> { };
                checkProd = prodAccount.Any(g => connection.ConnectionString.Contains(g));
            }
        }
        public void SetConnexionName(string connexionName)
        {
            this.connexionName = connexionName;
            using (var connection = new SqlConnection(_configuration[$"ConnectionStrings:{connexionName}"]))
            {
                List<string> prodAccount = new List<string> { };
                checkProd = prodAccount.Any(g => connection.ConnectionString.Contains(g));
            }
        }

        public List<T> Select<T>(string request)
        {
            if (string.IsNullOrEmpty(request))
            {
                throw new Exception("Request Empty");
            }

            using (var connection = new SqlConnection(_connectionString))
            {
                return connection.Query<T>(request).ToList();
            }
        }

        public int Insert<T>(string request, List<T> items = null)
        {
            if (string.IsNullOrEmpty(request))
            {
                throw new Exception("Request Empty");
            }
            return Execute(request, items);
        }

        public int Update(string request)
        {
            return ExecuteQuery(request);
        }

        public int Delete(string request)
        {
            return ExecuteQuery(request);
        }

        private int Execute<T>(string request, List<T> items = null)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                return connection.Execute(request, items);
            }
        }

        private int ExecuteQuery(string request)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                return connection.Execute(request);
            }
        }
        public List<T> ExecuteMultiQuery<T,U>(string foreignKey)
        {
            using (var connection = new SqlConnection(_connectionString))
            {

                var sql = @$"select * from {typeof(T)}
                       select * from {typeof(U)} ";

                using (var multi = connection.QueryMultiple(sql))
                {
                    //var skillCategories = multi.Read<T>().ToDictionary(g => g., g=>g);


                    //skillCategories.ForEach((item) => {
                    //    item[""] = multi.Read<U>().Where(i => i.).ToList();

                    //});
                }

                return new List<T>();
            }
        }
        public List<T> ExecuteStoredProcedure<T>(string name, object param = null)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                return connection.Query<T>(name, param, commandType: CommandType.StoredProcedure).ToList();
            }
        }

        public List<T> ExecuteStoredText<T>(string query)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                return connection.Query<T>(query, null, null, true, 6000, commandType: CommandType.Text).ToList();
            }
        }

        public void ExecuteStoredText(string query)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Query(query, null, null, true, 6000, commandType: CommandType.Text);
            }
        }

        public bool isProd
        {
            get
            {
                return checkProd;
            }
        }

        public bool TestConnexion
        {
            get
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    try
                    {
                        connection.Open();
                        return true;
                    }
                    catch
                    {
                        return false;
                    }
                }
            }
        }

        public string ConnexionName
        {
            get
            {
                return this.connexionName;
            }
        }
    }
}
