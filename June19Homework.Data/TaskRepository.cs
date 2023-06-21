using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace June19Homework.Data
{
    public class TaskRepository
    {
        private readonly string _connectionString;
        public TaskRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public List<TaskItem> GetTaskItems()
        {
            var context = new TasksDbContext(_connectionString);
            return context.Tasks.Include(t => t.User).ToList();
        }
        public void AddTask(TaskItem task)
        {
            var context = new TasksDbContext(_connectionString);
            context.Tasks.Add(task);
            context.SaveChanges();
        }
        public void setTaskToDoing(int taskId, int userId)
        {

            var context = new TasksDbContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"UPDATE Tasks SET userId={userId} WHERE id={taskId}");
        }
        public void DeleteTask(int taskId)
        {
            var context = new TasksDbContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Tasks WHERE id={taskId}");
        }
        public TaskItem GetTaskById(int taskId)
        {
            var context = new TasksDbContext(_connectionString);
            return context.Tasks.Include(t => t.User).FirstOrDefault(t => t.Id == taskId);
        }
    }
}
