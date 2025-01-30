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
import { Button } from "./ui/button"
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
              <TableCell className="flex justify-center items-center"><Checkbox /></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <div className="">
          <Button>Delete</Button>
        </div>
      </Table>
    )
  }
  