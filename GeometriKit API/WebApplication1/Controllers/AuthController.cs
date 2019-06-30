using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    
    [ApiController]
    public class AuthController : ControllerBase
    {
        [Route("api/auth")]
        [HttpGet]
        public string getauth(string username, string password)
        {
            try
            {
                HttpRequest request = HttpContext.Request;
                //string username = request.Headers["username"];
                //string password = request.Headers["password"];

                crudDB obj = new crudDB();
                return obj.getUserDetails(username, password);
            }
            catch(Exception ex)
            {
                return "{\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }
           
        }


        [Route("api/register")]
        [HttpPost]
        public string register()
        {
            try
            {
                crudDB obj = new crudDB();
                using (var reader = new StreamReader(Request.Body))
                {
                    string body = reader.ReadToEnd();
                    return obj.register(JObject.Parse(body));
                }
            }
            catch (Exception ex)
            {
                return "{\"status\":\"false\",\"message\" : \"Error  " + ex.Message.ToString() + " \"}";
            }

        }

        [Route("api/removequestion")]
        [HttpPost]
        public string removequestion()
        {
            try
            {
                crudDB obj = new crudDB();
                using (var reader = new StreamReader(Request.Body))
                {
                    string body = reader.ReadToEnd();
                    return obj.removeQuestion(JObject.Parse(body));
                }
            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\",\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }

        }

        [Route("api/getallsubjects")]
        [HttpGet]
        public string getAllSubjects()
        {
            crudDB obj = new crudDB();
            return obj.getAllSubjects();
        }

        [Route("api/getsubjects")]
        [HttpGet]
        public string getSubjects(string filtered ,  string groupID)//string username, string password)
        {
            try
            {
                HttpRequest request = HttpContext.Request;
                
                crudDB obj = new crudDB();
                if(filtered == "true")
                    return obj.getSubjects( groupID);
                return obj.getSubjectsNotFiltered();
               
            }
            catch (Exception ex)
            {
                return "{\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }

        }



        [Route("api/getquestions")]
        [HttpGet]
        public string getQustions(string filtered, string subjectID, string groupID)
        {
            try
            {
                crudDB obj = new crudDB();
                HttpRequest request = HttpContext.Request;
                if (filtered == "true")
                {
                    return obj.getQustionBySubject(subjectID, groupID);
                }
                else
                {
                    return obj.getQustionByGroup(subjectID);
                }
            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\",\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }

        }


        [Route("api/setSubject")]
        [HttpPost]
        public string setSubject()
        {
            try
            {
                crudDB obj = new crudDB();
                using (var reader = new StreamReader(Request.Body))
                {
                    string body = reader.ReadToEnd();
                    return obj.setSubject(JObject.Parse(body));
                }
            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\",\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }

        }

        [Route("api/getAssignedClasses")]
        [HttpPost]
        public string getAssignedClasses()
        {
            try
            {
                crudDB obj = new crudDB();
                using (var reader = new StreamReader(Request.Body))
                {
                    string body = reader.ReadToEnd();
                    return obj.getAssignedClasses(JObject.Parse(body));
                }
            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\",\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }

        }

        [Route("api/editQuestion")]
        [HttpPost]
        public string editQuestion()
        {
            try
            {
                crudDB obj = new crudDB();
                using (var reader = new StreamReader(Request.Body))
                {
                    string body = reader.ReadToEnd();
                    return obj.editQuestion(JObject.Parse(body));
                }
            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\",\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }

        }

        [Route("api/isAssigned")]
        [HttpPost]
        public string isAssigned()
        {
            try
            {
                crudDB obj = new crudDB();
                using (var reader = new StreamReader(Request.Body))
                {
                    string body = reader.ReadToEnd();
                    return obj.isAssigned(JObject.Parse(body));
                }
            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\",\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }

        }
        [Route("api/getQuestionStatistics")]
        [HttpGet]
        public string getQuestionStatistics()
        {
            try
            {
                crudDB obj = new crudDB();
                return obj.getStatisticQuestions();


            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\",\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }

        }
        [Route("api/getUserStatistics")]
        [HttpGet]
        public string getUserStatistics()
        {
            try
            {
                crudDB obj = new crudDB();
                return obj.getStatisticUsers();


            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\",\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }

        }

        [Route("api/createGroup")]
        [HttpPost]
        public string createGroup()
        {
            try
            {
                crudDB obj = new crudDB();
                using (var reader = new StreamReader(Request.Body))
                {
                    string body = reader.ReadToEnd();
                    return obj.createGroup(JObject.Parse(body));
                }
            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\",\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }

        }



        [Route("api/updateAssignToGroup")]
        [HttpPost]
        public string updateAssignToGroup()
        {
            try
            {
                crudDB obj = new crudDB();
                using (var reader = new StreamReader(Request.Body))
                {
                    string body = reader.ReadToEnd();
                    return obj.updateAssignToGroup(JObject.Parse(body));
                }
            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\",\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }

        }

        [Route("api/removeAllQuestions")]
        [HttpGet]
        public string removeAllQuestions()
        {
            try
            {
                crudDB obj = new crudDB();
                
                    
                return obj.removeAllQuestions();
                
            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\",\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }

        }


        [Route("api/updateAssignClasses")]
        [HttpPost]
        public string updateAssignClasses()
        {
            try
            {
                crudDB obj = new crudDB();
                using (var reader = new StreamReader(Request.Body))
                {
                    string body = reader.ReadToEnd();
                    return obj.updateAssignClasses(JArray.Parse(body));
                }
            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\",\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }

        }

        [Route("api/deleteTeacherGroup")]
        [HttpPost]
        public string deleteTeacherGroup()
        {
            try
            {
                crudDB obj = new crudDB();
                using (var reader = new StreamReader(Request.Body))
                {
                    string body = reader.ReadToEnd();
                    return obj.deleteTeacherGroup(JObject.Parse(body));
                }
            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\",\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }

        }

        [Route("api/getTeacherSubjects")]
        [HttpPost]
        public string getTeacherSubjects()
        {
            try
            {
                crudDB obj = new crudDB();
                using (var reader = new StreamReader(Request.Body))
                {
                    string body = reader.ReadToEnd();
                    return obj.getTeacherSubjects(JObject.Parse(body));
                }
            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\",\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }

        }

        [Route("api/getTeacherQuestions")]
        [HttpPost]
        public string getTeacherQuestions()
        {
            try
            {
                crudDB obj = new crudDB();
                using (var reader = new StreamReader(Request.Body))
                {
                    string body = reader.ReadToEnd();
                    return obj.getTeacherQuestions(JObject.Parse(body));
                }
            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\",\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }

        }
        [Route("api/getTheorems")]
        [HttpPost]
        public string getTheorems()
        {
            try
            {
                crudDB obj = new crudDB();

              
                return obj.getTheorems();
                
            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\",\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }

        }



        [Route("api/updateUserSatistic")]
        [HttpPost]
        public string updateUserStatistic()
        {
            try
            {
                crudDB obj = new crudDB();
                using (var reader = new StreamReader(Request.Body))
                {
                    string body = reader.ReadToEnd();
                    return obj.updateUserStatistic(JObject.Parse(body));
                }
            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\",\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }

        }



        [Route("api/testlog")]
        [HttpPost]
        public string insertlog()
        {
            try
            {
                crudDB obj = new crudDB();
                using (var reader = new StreamReader(Request.Body))
                {
                    string body = reader.ReadToEnd();
                    return obj.insertLog(body);
                }
            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\",\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }

        }



        [Route("api/insertquestion")]
        [HttpPost]
        public string insertquestion()//[FromBody]JObject request)//string classID, string groupID)//string username, string password)
        {
            
            try
            {
               
                crudDB obj = new crudDB();
                using (var reader = new StreamReader(Request.Body))
                {
                    string body = reader.ReadToEnd();
                    return obj.insertQuestion(JObject.Parse(body));
                }
            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\",\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }

        }

        [Route("api/getHint")]
        [HttpPost]
        public string getHints()
        {
            //string S = "{\"questionID\" : \"22\"}";
            try
            {
                crudDB obj = new crudDB();
                using (var reader = new StreamReader(Request.Body))
                {
                    string body = reader.ReadToEnd();
                    return obj.getHints(JObject.Parse(body));
                }
            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\",\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }

        }


        [Route("api/getGroups")]
        [HttpPost]
        public string getGroups()
        {
            try
            {
                crudDB obj = new crudDB();
                using (var reader = new StreamReader(Request.Body))
                {
                    string body = reader.ReadToEnd();
                    return obj.getGroups(JObject.Parse(body));
                }
            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\",\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }

        }
        [Route("api/getTeacherGroups")]
        [HttpPost]
        public string getTeacherGroups()
        {
            try
            {
                crudDB obj = new crudDB();
                using (var reader = new StreamReader(Request.Body))
                {
                    string body = reader.ReadToEnd();
                    return obj.getTeacherGroups(JObject.Parse(body));
                }
            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\",\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }

        }

        [Route("api/DeleteHints")]
        [HttpPost]
        public string DeleteHints()
        {
            try
            {
                crudDB obj = new crudDB();
                using (var reader = new StreamReader(Request.Body))
                {
                    string body = reader.ReadToEnd();
                    return obj.deleteHint(JArray.Parse(body));
                }
            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\",\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }

        }
        [Route("api/addHints")]
        [HttpPost]
        public string addHints()
        {
            try
            {
                crudDB obj = new crudDB();
                using (var reader = new StreamReader(Request.Body))
                {
                    string body = reader.ReadToEnd();
                    return obj.addHint(JArray.Parse(body));
                }
            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\",\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }

        }

        [Route("api/getTpassword")]
        [HttpPost]
        public string getTpassword()
        {
            try
            {
                crudDB obj = new crudDB();
                using (var reader = new StreamReader(Request.Body))
                {
                    string body = reader.ReadToEnd();
                    return obj.getTpassword(JObject.Parse(body));
                }
            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\",\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }

        }

        [Route("api/getSchools")]
        [HttpPost]
        public string getSchools()
        {
            try
            {
                crudDB obj = new crudDB();

                return obj.getSchools();
               
            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\",\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }

        }

        [Route("api/GenericInsertAPI")]
        [HttpPost]
        public string GenericInsertAPI()
        {
            try
            {
                crudDB obj = new crudDB();
                using (var reader = new StreamReader(Request.Body))
                {
                    string body = reader.ReadToEnd();
                    return obj.genericInsertApi(JObject.Parse(body));
                }
            }
            catch (Exception ex)
            {
                return "{\"Status\":\"false\",\"masssege\" : \"Error" + ex.Message.ToString() + " \"}";
            }

        }


    }
}