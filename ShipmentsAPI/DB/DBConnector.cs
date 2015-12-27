using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShipmentsAPI.DAO
{
    public class DBConnector
    {
        public DBConnector() {
            Init();
        }

        public static MySqlConnection conn = null;

        public static string SmokeTest() {

            return conn.ServerVersion;
        }

        public static MySqlConnection GetConnection() {
            Init();
            return conn;
        }


        public static void Init()
        {

            string cs;

            try
            {
                conn = new MySqlConnection(cs);
                conn.Open();
                Console.WriteLine("[DBConnector] MySQL version : {0}", conn.ServerVersion);

            }
            catch (MySqlException ex)
            {
                Console.WriteLine("[DBConnector] Error: {0}", ex.ToString());

            }
        }

        public static void Close()
        {
            if (conn != null)
            {
                conn.Close();
            }

        }
    }
}
