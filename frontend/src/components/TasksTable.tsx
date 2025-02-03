import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "./ui/checkbox"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
interface Task {
    ID: number
    title: string
    description: string
    deadline: string
    priority: string
    category: string
}

interface TasksTableProps {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export function TasksTable({ tasks, setTasks }: TasksTableProps) {
  const [checked, setChecked] = useState(false)

  const deleteTask = async (task: Task) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/tasks/${task.ID}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
      if (!response.ok) {
        throw new Error("Deleting task failed");
      }
      const result = await response.json()
      console.log("Task deleted successfully: ", result)
    } catch (error: any) {
      throw error
    }
    
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
            <TableHead className="flex justify-center items-center">Delete</TableHead>
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
              <TableCell className="flex justify-center items-center">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Checkbox checked={checked} />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete your task {task.title}.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setChecked(false)}>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteTask(task)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  