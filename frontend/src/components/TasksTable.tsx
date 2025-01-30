import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import { Checkbox } from "./ui/checkbox"
interface Task {
    ID: number
    title: string
    description: string
    deadline: string
    priority: string
    category: string
}
  
export function TasksTable() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    // fetch api data

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/tasks')
        .then((response) => {
            if(!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then((data) => {
            setTasks(data)
            setLoading(false)
        })
        .catch((error) => {
            setError(error.message)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
      <Table>
        <TableCaption>A list of your tasks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
              <TableRow key={task.ID}>
              <TableCell className="font-medium">{task.ID}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.deadline}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>{task.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  