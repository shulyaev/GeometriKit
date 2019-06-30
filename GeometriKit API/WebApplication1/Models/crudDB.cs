using System;
using System.Collections.Generic;

using System.Linq;
using Newtonsoft.Json;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json.Linq;
using System.Text;

namespace WebApplication1.Models
{
    public class crudDB
    {
        private string connectionString = "Server = tcp:geometrikit.database.windows.net,1433;Database = geometrikit; Initial Catalog = geometrikit; Persist Security Info = False; User ID = dbadmin; Password = P@$$w0rd ; MultipleActiveResultSets = False; Encrypt = True; TrustServerCertificate = False; Connection Timeout = 30;";

        public static string EncodeName(string serverName)
        {
            try
            {
                return Convert.ToBase64String(Encoding.UTF8.GetBytes(serverName));
            }
            catch
            {
                return serverName;
            }

        }

        public static string DecoderName(string encodedServername)
        {
            try
            {
                return Encoding.UTF8.GetString(Convert.FromBase64String(encodedServername));
            }
            catch
            {
                return encodedServername;
            }
        }

        public string getQustionBySubject(string subjectID, string groupID)
        {

            var resDict = new Dictionary<string, object>();
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();



                using (SqlCommand cmd = new SqlCommand("UDP_GET_QUESTIONS_BY_SUBJECT", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@groupID", groupID);
                    cmd.Parameters.AddWithValue("@subjectID", subjectID);

                    using (SqlDataAdapter rdr = new SqlDataAdapter(cmd))
                    {
                        var fieldValues = new Dictionary<string, object>();
                        DataTable dtable = new DataTable();
                        List<Dictionary<string, object>> lst_to_return = new List<Dictionary<string, object>>();
                        rdr.Fill(dtable);
                        foreach (DataRow row in dtable.Rows)
                         {
                            fieldValues = new Dictionary<string, object>();
                            foreach (var col in dtable.Columns)
                            {
                                if (col.ToString() == "content")
                                {
                                    fieldValues[col.ToString()] = DecoderName(row[col.ToString()].ToString());
                                }
                                else
                                    fieldValues[col.ToString()] = row[col.ToString()].ToString();
                             
                            }
                            lst_to_return.Add(fieldValues);
                        }
                        if (dtable.Rows.Count == 0)
                        {
                            fieldValues["status"] = "false";
                        }
                        else
                        {
                            fieldValues["status"] = "true";
                            //fieldValues.Add("Subjects", getQustion(fieldValues["classID"].ToString(), fieldValues["groupID"].ToString()));
                        }
                        return (string)JsonConvert.SerializeObject(lst_to_return);


                    }
                }
            }
          
        }


        public string getStatisticQuestions()
        {

            var resDict = new Dictionary<string, object>();
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();



                using (SqlCommand cmd = new SqlCommand("UDP_GET_STATISTIC_FOR_CLASSIFICATION_QUESTIONS", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (SqlDataAdapter rdr = new SqlDataAdapter(cmd))
                    {
                        var fieldValues = new Dictionary<string, object>();
                        DataTable dtable = new DataTable();
                        List<Dictionary<string, object>> lst_to_return = new List<Dictionary<string, object>>();
                        rdr.Fill(dtable);
                        foreach (DataRow row in dtable.Rows)
                        {
                            fieldValues = new Dictionary<string, object>();
                            foreach (var col in dtable.Columns)
                            {                                                                                        
                                fieldValues[col.ToString()] = row[col.ToString()].ToString();
                            }
                            lst_to_return.Add(fieldValues);
                        }
                       
                        return (string)JsonConvert.SerializeObject(lst_to_return);


                    }
                }
            }

        }

        public string getStatisticUsers()
        {

            var resDict = new Dictionary<string, object>();
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();



                using (SqlCommand cmd = new SqlCommand("UDP_GET_STATISTIC_FOR_CLASSIFICATION_USERS", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (SqlDataAdapter rdr = new SqlDataAdapter(cmd))
                    {
                        var fieldValues = new Dictionary<string, object>();
                        DataTable dtable = new DataTable();
                        List<Dictionary<string, object>> lst_to_return = new List<Dictionary<string, object>>();
                        rdr.Fill(dtable);
                        foreach (DataRow row in dtable.Rows)
                        {
                            fieldValues = new Dictionary<string, object>();
                            foreach (var col in dtable.Columns)
                            {
                                fieldValues[col.ToString()] = row[col.ToString()].ToString();
                            }
                            lst_to_return.Add(fieldValues);
                        }

                        return (string)JsonConvert.SerializeObject(lst_to_return);


                    }
                }
            }

        }

        public string getHints(JObject request)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand("UDP_GET_HINTS", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@questionID", (string)request["questionID"]);
                        using (SqlDataAdapter rdr = new SqlDataAdapter(cmd))
                        {
                            var fieldValues = new Dictionary<string, object>();
                            DataTable dtable = new DataTable();
                            List<Dictionary<string, object>> lst_to_return = new List<Dictionary<string, object>>();
                            rdr.Fill(dtable);
                            foreach (DataRow row in dtable.Rows)
                            {
                                fieldValues = new Dictionary<string, object>();
                                foreach (var col in dtable.Columns)
                                {
                                    if (col.ToString() == "content")
                                    {
                                        fieldValues[col.ToString()] = DecoderName(row[col.ToString()].ToString());
                                    }
                                    else
                                        fieldValues[col.ToString()] = row[col.ToString()].ToString();
                                }
                                lst_to_return.Add(fieldValues);
                            }
                            if (dtable.Rows.Count == 0)
                            {
                                fieldValues["status"] = "false";
                            }
                            else
                            {
                                fieldValues["status"] = "true";
                               
                            }
                            return (string)JsonConvert.SerializeObject(lst_to_return);


                        }

                    }
                }
            }
            catch(Exception ex)
            {
                throw (ex);
            }
        }

        public string getTeacherSubjects(JObject request)
        {
            try
            {
                string procName = (string)request["filtered"] == "true" ? "UDP_TEACHER_GET_SUBJECTS_FILTER" : "UDP_TEACHER_GET_SUBJECTS";
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand(procName, conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@teacherID", (string)request["teacherID"]);
                        using (SqlDataAdapter rdr = new SqlDataAdapter(cmd))
                        {
                            var fieldValues = new Dictionary<string, object>();
                            DataTable dtable = new DataTable();
                            List<Dictionary<string, object>> lst_to_return = new List<Dictionary<string, object>>();
                            rdr.Fill(dtable);
                            foreach (DataRow row in dtable.Rows)
                            {
                                fieldValues = new Dictionary<string, object>();
                                foreach (var col in dtable.Columns)
                                {
                                    if (col.ToString() == "content")
                                    {
                                        fieldValues[col.ToString()] = DecoderName(row[col.ToString()].ToString());
                                    }
                                    else
                                        fieldValues[col.ToString()] = row[col.ToString()].ToString();
                                }
                                lst_to_return.Add(fieldValues);
                            }
                            if (dtable.Rows.Count == 0)
                            {
                                fieldValues["status"] = "false";
                            }
                            else
                            {
                                fieldValues["status"] = "true";

                            }
                            return (string)JsonConvert.SerializeObject(lst_to_return);


                        }

                    }
                }
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public string getTeacherQuestions(JObject request)
        {
            try
            {
                string procName = (string)request["filtered"] == "true" ? "UDP_GET_TEACHER_QUESTIONS_FILTER" : "UDP_GET_TEACHER_QUESTIONS";
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand(procName, conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@teacherID", (string)request["teacherID"]);
                        cmd.Parameters.AddWithValue("@subjectID", (string)request["subjectID"]);
                        using (SqlDataAdapter rdr = new SqlDataAdapter(cmd))
                        {
                            var fieldValues = new Dictionary<string, object>();
                            DataTable dtable = new DataTable();
                            List<Dictionary<string, object>> lst_to_return = new List<Dictionary<string, object>>();
                            rdr.Fill(dtable);
                            foreach (DataRow row in dtable.Rows)
                            {
                                fieldValues = new Dictionary<string, object>();
                                foreach (var col in dtable.Columns)
                                {
                                    if (col.ToString() == "content")
                                    {
                                        fieldValues[col.ToString()] = DecoderName(row[col.ToString()].ToString());
                                    }
                                    else
                                        fieldValues[col.ToString()] = row[col.ToString()].ToString();
                                }
                                lst_to_return.Add(fieldValues);
                            }
                            if (dtable.Rows.Count == 0)
                            {
                                fieldValues["status"] = "false";
                            }
                            else
                            {
                                fieldValues["status"] = "true";

                            }
                            return (string)JsonConvert.SerializeObject(lst_to_return);


                        }

                    }
                }
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public string getTheorems()
        {
            try
            {
                
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand("UDP_GET_THEOREMS", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        using (SqlDataAdapter rdr = new SqlDataAdapter(cmd))
                        {
                            var fieldValues = new Dictionary<string, object>();
                            DataTable dtable = new DataTable();
                            List<Dictionary<string, object>> lst_to_return = new List<Dictionary<string, object>>();
                            rdr.Fill(dtable);
                            foreach (DataRow row in dtable.Rows)
                            {
                                fieldValues = new Dictionary<string, object>();
                                foreach (var col in dtable.Columns)
                                {
                                    if (col.ToString() == "content")
                                    {
                                        fieldValues[col.ToString()] = DecoderName(row[col.ToString()].ToString());
                                    }
                                    else
                                        fieldValues[col.ToString()] = row[col.ToString()].ToString();
                                }
                                lst_to_return.Add(fieldValues);
                            }
                            if (dtable.Rows.Count == 0)
                            {
                                fieldValues["status"] = "false";
                            }
                            else
                            {
                                fieldValues["status"] = "true";

                            }
                            return (string)JsonConvert.SerializeObject(lst_to_return);


                        }

                    }
                }
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public string insertQuestion(JObject request)
        {
            try
            {
                int questionID = -1;
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();



                    using (SqlCommand cmd = new SqlCommand("UDP_INSERT_NEW_QUESTION", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@bookName", (string)request["bookName"]);
                        cmd.Parameters.AddWithValue("@page", (string)request["page"]);
                        cmd.Parameters.AddWithValue("@title", (string)request["title"]);
                        cmd.Parameters.AddWithValue("@questionNumber", (string)request["questionNumber"]);
                        cmd.Parameters.AddWithValue("@authorID", (string)request["authorID"]);
                        cmd.Parameters.AddWithValue("@content",EncodeName( (string)request["content"]));
                        cmd.Parameters.AddWithValue("@picture", (string)request["picture"]);
                        cmd.Parameters.AddWithValue("@rank", "5");
                     
                        var returnParameter = cmd.Parameters.AddWithValue("@ReturnVal", SqlDbType.Int);
                        returnParameter.Direction = ParameterDirection.ReturnValue;

                        
                        cmd.ExecuteNonQuery();
                        questionID = (int)returnParameter.Value;

                        if (questionID < 0)
                        {
                            throw new Exception("somethint went wrong in data base..");
                        }


                    }
                    foreach (JObject hint in request["hints"])
                    {
                        using (SqlCommand cmd = new SqlCommand("UDP_INSERT_HINT", conn))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@questionID", (int)questionID);
                            cmd.Parameters.AddWithValue("@type", (string)hint["type"]);
                            cmd.Parameters.AddWithValue("@content", EncodeName((string)hint["content"]));
                            cmd.Parameters.AddWithValue("@rank", 5);
                            cmd.Parameters.AddWithValue("@teacherID", (string)request["authorID"]);
                            int res = cmd.ExecuteNonQuery();
                            if (res !=1)
                            {
                                throw new Exception("somethint went wrong in data base..");
                            }
                           

                        }
                    }
                    foreach(JValue subject in request["subjects"])
                    {
                        using (SqlCommand cmd = new SqlCommand("UDP_INSERT_QUESTIONSUBJECT", conn))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@questionID", questionID.ToString());
                            cmd.Parameters.AddWithValue("@subjectID", (string)subject);
                            
                            int res = cmd.ExecuteNonQuery();
                            if (res != 1)
                            {
                                throw new Exception("somethint went wrong in data base..");
                            }


                        }
                    }
                }
                return "true";

            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public string register(JObject request)
        {
            try
            {
           
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();


                    
                    using (SqlCommand cmd = new SqlCommand("UDP_REGISTER_USER", conn))
                    {
                         
                        cmd.CommandType = CommandType.StoredProcedure;
                     
                        cmd.Parameters.AddWithValue("@firstName", (string)request["firstName"]);
                        cmd.Parameters.AddWithValue("@lastName", (string)request["lastName"]);
                        cmd.Parameters.AddWithValue("@userName", (string)request["userName"]);
                        cmd.Parameters.AddWithValue("@password", (string)request["password"]);
                        cmd.Parameters.AddWithValue("@profilePicture", "X");// (string)request["profilePicture"]);
                        cmd.Parameters.AddWithValue("@schoolID", (string)request["schoolID"]);
                        cmd.Parameters.AddWithValue("@permissionID", (string)request["permissionID"]);

                        using (SqlDataAdapter rdr = new SqlDataAdapter(cmd))
                        {
                            var fieldValues = new Dictionary<string, object>();
                            DataTable dtable = new DataTable();
                            rdr.Fill(dtable);
                            foreach (DataRow row in dtable.Rows)
                            {
                                foreach (var col in dtable.Columns)
                                {
                                    fieldValues.Add(col.ToString(), row[col.ToString()].ToString());
                                }
                            }
                            if (dtable.Rows.Count == 0)
                            {
                                fieldValues["status"] = "false";
                            }
                            else
                            {
                                fieldValues["status"] = "true";
                               
                            }
                            return (string)JsonConvert.SerializeObject(fieldValues);


                        }






                    }
                    
                    
                }
             

            }
            catch (Exception ex)
            {
                return "{\"status\":\"false\",\"message\":\"שם המשתמש קיים במערכת\"}";
            }
        }


        public string removeQuestion(JObject request)
        {
            try
            {

                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();



                    using (SqlCommand cmd = new SqlCommand("UDP_DELETE_QUESTION", conn))
                    {

                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@questionID", (string)request["questionID"]);
                        
                        int res = cmd.ExecuteNonQuery();


                        if (res <= 0)
                        {
                            throw new Exception("something went wrong in data base..");
                        }


                    }


                }
                return "{\"Status\":\"true\"}";

            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\", \"msg\" : \"" +ex.Message +"\"}";
            }
        }


        public string updateUserStatistic(JObject request)
        {
            try
            {

                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();



                    using (SqlCommand cmd = new SqlCommand("UDP_UPDATE_USER_STATISTICS", conn))
                    {

                        cmd.CommandType = CommandType.StoredProcedure;
                        
                        cmd.Parameters.AddWithValue("@id", (string)request["id"]);
                        cmd.Parameters.AddWithValue("@success", (string)request["success"]=="true"?1:0 );
                        cmd.Parameters.AddWithValue("@userID", (string)request["userID"]);
                        cmd.Parameters.AddWithValue("@questionID", (string)request["questionID"] == null ? "0" : (string)request["questionID"]);
                        cmd.Parameters.AddWithValue("@hintID", (string)request["hintID"] == null ? "0" : (string)request["hintID"]);

                        int res = cmd.ExecuteNonQuery();


                        if (res <= 0)
                        {
                            throw new Exception("something went wrong in data base..");
                        }


                    }


                }
                return "{\"Status\":\"true\"}";

            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\", \"msg\" : \"" + ex.Message + "\"}";
            }
        }

        public string updateAssignClasses(JArray requestList)
        {
            try
            {

                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();


                    foreach (JObject request in requestList)
                    {
                        using (SqlCommand cmd = new SqlCommand("UDP_UPDATE_ASSIGN_CLASSES", conn))
                        {

                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@assigned", (string)request["assigned"]);                  
                            cmd.Parameters.AddWithValue("@groupID", (string)request["groupID"]);
                            cmd.Parameters.AddWithValue("@questionID", (string)request["questionID"]);
                            int res = cmd.ExecuteNonQuery();
                        }
                    }
                }
                return "{\"Status\":\"true\"}";
            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\", \"msg\" : \"" + ex.Message + "\"}";
            }
        }


        public string deleteTeacherGroup(JObject request)
        {
            try
            {

                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();



                    using (SqlCommand cmd = new SqlCommand("UDP_DELETE_TEACHER_GROUP", conn))
                    {

                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@groupID", (string)request["groupID"]);
                       

                        int res = cmd.ExecuteNonQuery();


                        if (res <= 0)
                        {
                            throw new Exception("something went wrong in data base..");
                        }


                    }


                }
                return "{\"Status\":\"true\"}";

            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\", \"msg\" : \"" + ex.Message + "\"}";
            }
        }
        public string setSubject(JObject request)
        {
            try
            {

                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();



                    using (SqlCommand cmd = new SqlCommand("UDP_SET_SUBJECT", conn))
                    {
                        
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@subjectName", (string)request["subjectName"]);
                        cmd.Parameters.AddWithValue("@questionnaire", (string)request["questionnaire"]);
                        cmd.Parameters.AddWithValue("@color", (string)request["color"]);
                        cmd.Parameters.AddWithValue("@picture", (string)request["picture"]);

                        int res = cmd.ExecuteNonQuery();


                        if (res <= 0)
                        {
                            throw new Exception("something went wrong in data base..");
                        }


                    }


                }
                return "{\"Status\":\"true\"}";

            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\", \"msg\" : \"" + ex.Message + "\"}";
            }
        }

        public string editQuestion(JObject request)
        {
            try
            {

                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();



                    using (SqlCommand cmd = new SqlCommand("UDP_EDIT_QUESTION", conn))
                    {

                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@questionID", (string)request["questionID"]);
                        cmd.Parameters.AddWithValue("@content", EncodeName((string)request["content"]));
                        cmd.Parameters.AddWithValue("@picture", (string)request["picture"]);

                        int res = cmd.ExecuteNonQuery();


                        if (res <= 0)
                        {
                            throw new Exception("something went wrong in data base..");
                        }


                    }


                }
                return "{\"Status\":\"true\"}";

            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\", \"msg\" : \"" + ex.Message + "\"}";
            }
        }

        public string createGroup(JObject request)
        {
            try
            {

                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();



                    using (SqlCommand cmd = new SqlCommand("UDP_CREATE_GROUP", conn))
                    {

                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@questionnaire", (string)request["questionnaire"]);
                        cmd.Parameters.AddWithValue("@grade", (string)request["grade"]);
                        cmd.Parameters.AddWithValue("@teacherID", (string)request["teacherID"]);
                     

                        int res = cmd.ExecuteNonQuery();


                        if (res <= 0)
                        {
                            throw new Exception("something went wrong in data base..");
                        }


                    }


                }
                return "{\"Status\":\"true\"}";

            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\", \"msg\" : \"" + ex.Message + "\"}";
            }
        }
        //updateAssignToGroup
        public string updateAssignToGroup(JObject request)
        {
            try
            {

                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();



                    using (SqlCommand cmd = new SqlCommand("UDP_UPDATE_ASSIGN_TO_GROUP", conn))
                    {

                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@studentID", (string)request["studentID"]);
                        cmd.Parameters.AddWithValue("@groupID", (string)request["groupID"]);
                        


                        int res = cmd.ExecuteNonQuery();


                        if (res <= 0)
                        {
                            throw new Exception("something went wrong in data base..");
                        }


                    }


                }
                return "{\"Status\":\"true\"}";

            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\", \"msg\" : \"" + ex.Message + "\"}";
            }
        }

        public string removeAllQuestions()
        {
            try
            {

                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();



                    using (SqlCommand cmd = new SqlCommand("UDP_REMOVE_ALL_QUESTIONS", conn))
                    {

                        cmd.CommandType = CommandType.StoredProcedure;
                   



                        int res = cmd.ExecuteNonQuery();


                        if (res <= 0)
                        {
                            throw new Exception("something went wrong in data base..");
                        }


                    }


                }
                return "{\"Status\":\"true\"}";

            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\", \"msg\" : \"" + ex.Message + "\"}";
            }
        }

        public string getTeacherGroups(JObject request)
        {
            try
            {

                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();



                    using (SqlCommand cmd = new SqlCommand("UDP_GET_TEACHER_GROUPS", conn))
                    {

                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@teacherID", (string)request["teacherID"]);


                        using (SqlDataAdapter rdr = new SqlDataAdapter(cmd))
                        {
                            var fieldValues = new Dictionary<string, object>();
                            DataTable dtable = new DataTable();
                            List<Dictionary<string, object>> lst_to_return = new List<Dictionary<string, object>>();
                            rdr.Fill(dtable);
                            foreach (DataRow row in dtable.Rows)
                            {
                                fieldValues = new Dictionary<string, object>();
                                foreach (var col in dtable.Columns)
                                {
                                    fieldValues[col.ToString()] = row[col.ToString()].ToString();
                                }
                                lst_to_return.Add(fieldValues);
                            }
                            if (dtable.Rows.Count == 0)
                            {
                                fieldValues["status"] = "false";
                            }
                            else
                            {
                                fieldValues["status"] = "true";

                            }
                            return (string)JsonConvert.SerializeObject(lst_to_return);
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\", \"msg\" : \"" + ex.Message + "\"}";
            }
        }

        public string isAssigned(JObject request)
        {
            try
            {

                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();



                    using (SqlCommand cmd = new SqlCommand("UDP_IS_ASSIGNED", conn))
                    {

                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@studentID", (string)request["studentID"]);


                        using (SqlDataAdapter rdr = new SqlDataAdapter(cmd))
                        {
                            var fieldValues = new Dictionary<string, object>();
                            DataTable dtable = new DataTable();
                           
                            rdr.Fill(dtable);
                            foreach (DataRow row in dtable.Rows)
                            {
                                fieldValues = new Dictionary<string, object>();
                                foreach (var col in dtable.Columns)
                                {
                                    fieldValues[col.ToString()] = row[col.ToString()].ToString();
                                }
                         
                            }
                            if (dtable.Rows.Count == 0)
                            {
                                fieldValues["status"] = "false";
                            }
                            else
                            {
                                fieldValues["status"] = "true";

                            }
                            return (string)JsonConvert.SerializeObject(fieldValues);
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\", \"msg\" : \"" + ex.Message + "\"}";
            }
        }


        public string getGroups(JObject request)
        {
            try
            {

                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();



                    using (SqlCommand cmd = new SqlCommand("UDP_GET_GROUPS", conn))
                    {

                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@userID", (string)request["userID"]);
                        

                        using (SqlDataAdapter rdr = new SqlDataAdapter(cmd))
                        {
                            var fieldValues = new Dictionary<string, object>();
                            DataTable dtable = new DataTable();
                            List<Dictionary<string, object>> lst_to_return = new List<Dictionary<string, object>>();
                            rdr.Fill(dtable);
                            foreach (DataRow row in dtable.Rows)
                            {
                                fieldValues = new Dictionary<string, object>();
                                foreach (var col in dtable.Columns)
                                {
                                    fieldValues[col.ToString()] = row[col.ToString()].ToString();
                                }
                                lst_to_return.Add(fieldValues);
                            }
                            if (dtable.Rows.Count == 0)
                            {
                                fieldValues["status"] = "false";
                            }
                            else
                            {
                                fieldValues["status"] = "true";

                            }
                            return (string)JsonConvert.SerializeObject(lst_to_return);
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\", \"msg\" : \"" + ex.Message + "\"}";
            }
        }

        public string getSchools()
        {
            try
            {

                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();



                    using (SqlCommand cmd = new SqlCommand("UDP_GET_SCHOOLS", conn))
                    {

                        cmd.CommandType = CommandType.StoredProcedure;
                       


                        using (SqlDataAdapter rdr = new SqlDataAdapter(cmd))
                        {
                            var fieldValues = new Dictionary<string, object>();
                            DataTable dtable = new DataTable();
                            List<Dictionary<string, object>> lst_to_return = new List<Dictionary<string, object>>();
                            rdr.Fill(dtable);
                            foreach (DataRow row in dtable.Rows)
                            {
                                fieldValues = new Dictionary<string, object>();
                                foreach (var col in dtable.Columns)
                                {
                                    fieldValues[col.ToString()] = row[col.ToString()].ToString();
                                }
                                lst_to_return.Add(fieldValues);
                            }
                            if (dtable.Rows.Count == 0)
                            {
                                fieldValues["status"] = "false";
                            }
                            else
                            {
                                fieldValues["status"] = "true";

                            }
                            return (string)JsonConvert.SerializeObject(lst_to_return);
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\", \"msg\" : \"" + ex.Message + "\"}";
            }
        }


        public string getAssignedClasses(JObject request)
        {
            try
            {

                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();



                    using (SqlCommand cmd = new SqlCommand("UDP_GET_ASSIGNED_CLASSES", conn))
                    {

                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@questionID", (string)request["questionID"]);
                        cmd.Parameters.AddWithValue("@teacherID", (string)request["teacherID"]);

                        using (SqlDataAdapter rdr = new SqlDataAdapter(cmd))
                        {
                            var fieldValues = new Dictionary<string, object>();
                            DataTable dtable = new DataTable();
                            List<Dictionary<string, object>> lst_to_return = new List<Dictionary<string, object>>();
                            rdr.Fill(dtable);
                            foreach (DataRow row in dtable.Rows)
                            {
                                fieldValues = new Dictionary<string, object>();
                                foreach (var col in dtable.Columns)
                                {
                                    fieldValues[col.ToString()] = row[col.ToString()].ToString(); 
                                }
                                lst_to_return.Add(fieldValues);
                            }
                            if (dtable.Rows.Count == 0)
                            {
                                fieldValues["status"] = "false";
                            }
                            else
                            {
                                fieldValues["status"] = "true";

                            }
                            return (string)JsonConvert.SerializeObject(lst_to_return);
                        }                     
                    }                
                }

            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\", \"msg\" : \"" + ex.Message + "\"}";
            }
        }

        public string getQustionByGroup(string subjectID)
        {

            var resDict = new Dictionary<string, object>();
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();



                using (SqlCommand cmd = new SqlCommand("UDP_GET_QUESTIONS", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@subjectID", subjectID);
               

                    using (SqlDataAdapter rdr = new SqlDataAdapter(cmd))
                    {
                        var fieldValues = new Dictionary<string, object>();
                        DataTable dtable = new DataTable();
                        List<Dictionary<string, object>> lst_to_return = new List<Dictionary<string, object>>();
                        rdr.Fill(dtable);
                        foreach (DataRow row in dtable.Rows)
                        {
                            fieldValues = new Dictionary<string, object>();
                            foreach (var col in dtable.Columns)
                            {
                                if (col.ToString()== "content")
                                {
                                    fieldValues[col.ToString()] = DecoderName(row[col.ToString()].ToString());
                                }
                                else
                                    fieldValues[col.ToString()] = row[col.ToString()].ToString();
                            }
                            lst_to_return.Add(fieldValues);
                        }
                        if (dtable.Rows.Count == 0)
                        {
                            fieldValues["status"] = "false";
                        }
                        else
                        {
                            fieldValues["status"] = "true";
                            //fieldValues.Add("Subjects", getQustion(fieldValues["classID"].ToString(), fieldValues["groupID"].ToString()));
                        }
                        return (string)JsonConvert.SerializeObject(lst_to_return);


                    }
                }
            }

        }

        public string insertLog(string log)
        {
            

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand("UDP_INSERT_LOG", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@log", log);
                    int i = cmd.ExecuteNonQuery();
                    if (i > 0)
                        return "ture";
                    else
                        return "false";
                }
            }
        }



        public Dictionary<string, object> getQustion(string classID, string groupID)
        {

            var resDict = new Dictionary<string, object>();
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();



                using (SqlCommand cmd = new SqlCommand("UDP_GET_QUESTIONS", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@groupID", groupID);
                    cmd.Parameters.AddWithValue("@classID", classID);

                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        string questionID = "0";
                        DataTable dtable = new DataTable();
                        da.Fill(dtable);
                        foreach(DataRow rdr in dtable.Rows)	

                        {

                            if (resDict.ContainsKey(rdr["subjectName"].ToString()))
                            {
                                Dictionary<string, object> Sdict = resDict[rdr["subjectName"].ToString()] as Dictionary<string, object>;
                                //Dictionary<string, object> Qdict = Sdict["questions"] as Dictionary<string, object>;
                                var f = Sdict["questions"];
                                var s = Sdict["questions"].GetType().ToString();
                                Dictionary<string, Dictionary<string,object>> Qdict = (Dictionary<string,Dictionary<string,object>>)Sdict["questions"]; 
                                //if (Qdict.ContainsKey(rdr["questionID"].ToString()))
                                    if(Qdict.ContainsKey(rdr["questionID"].ToString()))
                                {
                                    var QIdict = Qdict[rdr["questionID"].ToString()] as Dictionary<string, object>;
                                    var HintList = QIdict["hint"] as List<Dictionary<string, object>>;
                                    HintList.Add(
                                         new Dictionary<string, object> {
                                                             { "hintContent", rdr["hintContent"].ToString()},
                                                             { "hintPicture", rdr["hintPicture"].ToString()} }
                                        );
                                }
                                else
                                {
                                    questionID = rdr["questionID"].ToString();
                                    var SdictE = resDict[rdr["subjectName"].ToString()] as Dictionary<string, object>;
                                    var QdictE = SdictE["questions"] as Dictionary<string, object>;
                                    QdictE.Add(
                                        rdr["questionID"].ToString(), new Dictionary<string, object>
                                                                                            {
                                                                                            { "bookName", rdr["bookName"].ToString()},
                                                                                            { "page", rdr["page"].ToString()},
                                                                                            { "questionNumber", rdr["questionNumber"].ToString() },
                                                                                            { "content", rdr["content"].ToString() },
                                                                                            { "questionPicture", rdr["questionPicture"].ToString() },
                                                                                            { "questionRank",rdr["questionRank"].ToString()},
                                                                                            { "hint",new List<Dictionary<string, object>>{ new Dictionary<string, object> {
                                                                                                { "hintContent", rdr["hintContent"].ToString()},
                                                                                                { "hintPicture", rdr["hintPicture"].ToString()} }
                                                                                                                                            } }
                                                                                            }
                                        );
                                }



                            }
                            else
                            {
                                var subjectDict = new Dictionary<string, object>
                                {
                                    { "color" , rdr["subjectColor"].ToString()},
                                    { "questions", new Dictionary<string,Dictionary<string, object>>{
                                        { rdr["questionID"].ToString(),  new Dictionary<string, object>
                                                                                            {
                                                                                            { "bookName", rdr["bookName"].ToString()},
                                                                                            { "page", rdr["page"].ToString()},
                                                                                            { "questionNumber", rdr["questionNumber"].ToString() },
                                                                                            { "content", rdr["content"].ToString() },
                                                                                            { "questionPicture", rdr["questionPicture"].ToString() },
                                                                                            { "questionRank",rdr["questionRank"].ToString()},
                                                                                            { "hint",new List<Dictionary<string, object>>{ new Dictionary<string, object> {
                                                                                                { "hintContent", rdr["hintContent"].ToString()},
                                                                                                { "hintPicture", rdr["hintPicture"].ToString()} }
                                                                                                                                            } }
                                                                                            }
                                            }
                                        }
                                    }
                                };


                                resDict.Add(rdr["subjectName"].ToString(), subjectDict);
                            }



                        }
                    }
                }
            }
            return resDict;
        }

        public string getUserDetails(string username, string password)
        {
            using (SqlConnection sqlcon = new SqlConnection(connectionString))
            {
                sqlcon.Open();
                using (SqlCommand cmd = new SqlCommand("UDP_GET_USER_DETAILS", sqlcon))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@passwordD", password);
                    cmd.Parameters.AddWithValue("@username", username);

                    using (SqlDataAdapter rdr = new SqlDataAdapter(cmd))
                    {
                        var fieldValues = new Dictionary<string, object>();
                        DataTable dtable = new DataTable();
                        rdr.Fill(dtable);
                        foreach (DataRow row in dtable.Rows)
                        {
                            foreach (var col in dtable.Columns)
                            {
                                fieldValues.Add(col.ToString(), row[col.ToString()].ToString());
                            }
                        }
                        if (dtable.Rows.Count == 0)
                        {
                            fieldValues["status"] = "false";
                        }
                        else
                        {
                            fieldValues["status"] = "true";
                            //fieldValues.Add("Subjects", getQustion(fieldValues["classID"].ToString(), fieldValues["groupID"].ToString()));
                        }
                        return (string)JsonConvert.SerializeObject(fieldValues);


                    }
                }
            }
        }
        public string getSubjects( string groupID)
        {
            using (SqlConnection sqlcon = new SqlConnection(connectionString))
            {
                sqlcon.Open();
                using (SqlCommand cmd = new SqlCommand("UDP_GET_SUBJECTS", sqlcon))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@classID", groupID);
                    //cmd.Parameters.AddWithValue("@groupID", groupID);

                    using (SqlDataAdapter rdr = new SqlDataAdapter(cmd))
                    {
                        var fieldValues = new Dictionary<string, object>();
                        DataTable dtable = new DataTable();
                        List<Dictionary<string, object>> lst_to_return = new List<Dictionary<string, object>>();
                        rdr.Fill(dtable);
                        foreach (DataRow row in dtable.Rows){
                            fieldValues = new Dictionary<string, object>();
                            foreach (var col in dtable.Columns)
                            {
                                fieldValues[col.ToString()]= row[col.ToString()].ToString();
                            }
                            lst_to_return.Add(fieldValues);
                        }
                        if (dtable.Rows.Count == 0)
                        {
                            fieldValues["status"] = "false";
                        }
                        else
                        {
                            fieldValues["status"] = "true";
                            //fieldValues.Add("Subjects", getQustion(fieldValues["classID"].ToString(), fieldValues["groupID"].ToString()));
                        }
                        return (string)JsonConvert.SerializeObject(lst_to_return);


                        }
                    }
                }
        }

        public string getSubjectsNotFiltered()
        {
            using (SqlConnection sqlcon = new SqlConnection(connectionString))
            {
                sqlcon.Open();
                using (SqlCommand cmd = new SqlCommand("UDP_GET_SUBJECTS_WITOUT_CLASS_FILTER", sqlcon))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    
                    //cmd.Parameters.AddWithValue("@groupID", groupID);

                    using (SqlDataAdapter rdr = new SqlDataAdapter(cmd))
                    {
                        var fieldValues = new Dictionary<string, object>();
                        DataTable dtable = new DataTable();
                        List<Dictionary<string, object>> lst_to_return = new List<Dictionary<string, object>>();
                        rdr.Fill(dtable);
                        foreach (DataRow row in dtable.Rows)
                        {
                            fieldValues = new Dictionary<string, object>();
                            foreach (var col in dtable.Columns)
                            {
                                fieldValues[col.ToString()] = row[col.ToString()].ToString();
                            }
                            lst_to_return.Add(fieldValues);
                        }
                        if (dtable.Rows.Count == 0)
                        {
                            fieldValues["status"] = "false";
                        }
                        else
                        {
                            fieldValues["status"] = "true";
                            //fieldValues.Add("Subjects", getQustion(fieldValues["classID"].ToString(), fieldValues["groupID"].ToString()));
                        }
                        return (string)JsonConvert.SerializeObject(lst_to_return);


                    }
                }
            }
        }

        public string deleteHint(JArray requestList)
        {
            try
            {

                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();


                    foreach(JValue hintID in requestList) {
                        using (SqlCommand cmd = new SqlCommand("UDP_DELETE_HINT", conn))
                        {

                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@hintID", hintID.ToString());                          
                            int res = cmd.ExecuteNonQuery();
                            if (res <= 0)
                            {
                                throw new Exception("something went wrong in data base..");
                            }
                        }
                    }
                }
                return "{\"Status\":\"true\"}";

            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\", \"msg\" : \"" + ex.Message + "\"}";
            }
        }

        public string addHint(JArray requestList)
        {
            try
            {

                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();


                    foreach (JObject request in requestList)
                    {
                        using (SqlCommand cmd = new SqlCommand("UDP_INSERT_HINT", conn))
                        {

                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@questionID", (string)request["questionID"]);
                            cmd.Parameters.AddWithValue("@type", (string)request["type"]);
                            cmd.Parameters.AddWithValue("@content", EncodeName((string)request["content"]));
                            cmd.Parameters.AddWithValue("@rank", 5);
                            cmd.Parameters.AddWithValue("@teacherID", (string)request["teacherID"]);
                            int res = cmd.ExecuteNonQuery();
                            if (res <= 0)
                            {
                                throw new Exception("something went wrong in data base..");
                            }
                        }
                    }
                }
                return "{\"Status\":\"true\"}";

            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\", \"msg\" : \"" + ex.Message + "\"}";
            }
        }
          
        public string genericInsertApi(JObject request)
        {
            try { 
                JArray keys = (JArray)request["keys"];
                string procdureName = (string)request["procName"];
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand(procdureName, conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        foreach (string key in keys)
                        {
                            if(key == "content")
                            {
                                cmd.Parameters.AddWithValue("@" + key, (string)request[key]);
                            }
                            else
                                cmd.Parameters.AddWithValue("@" + key, (string)request[key]);
                        }

                        int i = cmd.ExecuteNonQuery();
                        if (i > 0)
                            return "ture";
                        else
                            return "false";
                    }
                }
            }
            catch(Exception ex)
            {
                throw(ex);
            }
            
        }

        public string getTpassword(JObject request)
        {
            if ((string)request["InternalPassword"] != "ASOBAT")
            {
                return "{\"message\" : \"yoe have no permission to get this password' please contact with Amichay Turjeman 0546603723\" }";
            }
            using (SqlConnection sqlcon = new SqlConnection(connectionString))
            {
                sqlcon.Open();
                using (SqlCommand cmd = new SqlCommand("UDP_GET_TPASSWORD", sqlcon))
                {
                    cmd.CommandType = CommandType.StoredProcedure;


                    using (SqlDataAdapter rdr = new SqlDataAdapter(cmd))
                    {
                        var fieldValues = new Dictionary<string, object>();
                        DataTable dtable = new DataTable();
                      
                        rdr.Fill(dtable);
                        foreach (DataRow row in dtable.Rows)
                        {
                            fieldValues = new Dictionary<string, object>();
                            foreach (var col in dtable.Columns)
                            {
                                fieldValues[col.ToString()] = row[col.ToString()].ToString();
                            }
                          
                        }
                        if (dtable.Rows.Count == 0)
                        {
                            fieldValues["status"] = "false";
                        }
                        else
                        {
                            fieldValues["status"] = "true";

                        }
                        return (string)JsonConvert.SerializeObject(fieldValues);


                    }
                }
            }
        }

        public string getAllSubjects()
        {
            using (SqlConnection sqlcon = new SqlConnection(connectionString))
            {
                sqlcon.Open();
                using (SqlCommand cmd = new SqlCommand("UDP_GET_ALL_SUBJECTS", sqlcon))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                   

                    using (SqlDataAdapter rdr = new SqlDataAdapter(cmd))
                    {
                        var fieldValues = new Dictionary<string, object>();
                        DataTable dtable = new DataTable();
                        List<Dictionary<string, object>> lst_to_return = new List<Dictionary<string, object>>();
                        rdr.Fill(dtable);
                        foreach (DataRow row in dtable.Rows)
                        {
                            fieldValues = new Dictionary<string, object>();
                            foreach (var col in dtable.Columns)
                            {
                                fieldValues[col.ToString()] = row[col.ToString()].ToString();
                            }
                            lst_to_return.Add(fieldValues);
                        }
                        if (dtable.Rows.Count == 0)
                        {
                            fieldValues["status"] = "false";
                        }
                        else
                        {
                            fieldValues["status"] = "true";
                           
                        }
                        return (string)JsonConvert.SerializeObject(lst_to_return);


                    }
                }
            }
        }
    }
    }

    

