using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace June19Homework.Data
{
    public class UserRepository
    {
        private readonly string _connectionString;
        public UserRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddUser(User u, string password)
        {
            u.HashPassword = BCrypt.Net.BCrypt.HashPassword(password);
            var context = new TasksDbContext(_connectionString);
            context.Users.Add(u);
            context.SaveChanges();
        }
        public User GetByEmail(string email)
        {
            var context = new TasksDbContext(_connectionString);
            return context.Users.FirstOrDefault(u => u.Email == email);
        }
        public User Login(string email, string password)
        {
            User u = GetByEmail(email);
            if(u == null)
            {
                return null;
            }
            bool isValidPassword = BCrypt.Net.BCrypt.Verify(password, u.HashPassword);
            if (!isValidPassword)
            {
                return null;
            }
            return u;

        }
    }
}
