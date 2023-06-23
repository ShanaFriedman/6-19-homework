using June19Homework.Data;
using June19Homework.Web.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace June19Homework.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TaskController : ControllerBase
    {
        private IHubContext<TaskHub> _hub;
        private readonly string _connectionString;
        public TaskController(IConfiguration configuration, IHubContext<TaskHub> hub)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
            _hub = hub;
        }
        [HttpGet]
        [Route("gettasks")]
        public List<TaskItem> GetTaskItems()
        {
            var taskRepo = new TaskRepository(_connectionString);
            return taskRepo.GetTaskItems();
        }
        [HttpPost]
        [Route("addtask")]
        public void AddTask(TaskItem task)
        {
            if(task.Title.Trim() == "")
            {
                return;
            }
            var taskRepo = new TaskRepository(_connectionString);
            taskRepo.AddTask(task);
            _hub.Clients.All.SendAsync("newTask", task);
        }
        [HttpPost]
        [Route("settasktodoing")]
        public void SetTaskToDoing(StatusChangeViewModel vm)
        {
            var taskRepo = new TaskRepository(_connectionString);
            var userRepo = new UserRepository(_connectionString);
            var userId = userRepo.GetByEmail(User.Identity.Name).Id;
            taskRepo.setTaskToDoing(vm.TaskId, userId);
            _hub.Clients.All.SendAsync("setToDoing", taskRepo.GetTaskById(vm.TaskId));
        }
        [HttpPost]
        [Route("taskdone")]
        public void TaskDone(StatusChangeViewModel vm)
        {
            var taskRepo = new TaskRepository(_connectionString);
            taskRepo.DeleteTask(vm.TaskId);
            _hub.Clients.All.SendAsync("deleted", vm.TaskId);
        }
    }
}
