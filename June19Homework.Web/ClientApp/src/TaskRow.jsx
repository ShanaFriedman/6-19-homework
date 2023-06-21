

const TaskRow = (task) => {
    console.log("task row")
    console.log(task)
    console.log(task.title)
    return(<>
    <tr>
      <td>{task.title}</td>
      <td>
        <button className="btn btn-dark" fdprocessedid="7nwuos">
          I'm doing this one!
        </button>
      </td>
    </tr>
    </>)
}

export default TaskRow