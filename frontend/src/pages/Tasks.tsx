import { Label } from "@/components/ui/label";
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { TasksTable } from "@/components/TasksTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar"
import { SubmitHandler, useForm } from "react-hook-form"

import { useState, useEffect } from "react";
type FormFields = {
    title: string
    description: string
    deadline: any
    priority: string
    category: string
}

interface Task {
    ID: number
    title: string
    description: string
    deadline: string
    priority: string
    category: string
}

const Tasks = () => {
    const [date, setDate] = useState<Date>()
    const [tasks, setTasks] = useState<Task[]>([])

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
            })
            .catch((error) => {
                throw new error
            })
        }, [tasks])

        const { register, reset,handleSubmit, setValue, clearErrors, setError, formState: { errors, isSubmitting } } = useForm<FormFields>();
        const onSubmit: SubmitHandler<FormFields> = async (formData) => {
            try {
                if (!date) {
                    setError("deadline", { message: "Please select a deadline" });
                    return; 
                }
        
                const formattedDate = format(date, "yyyy-MM-dd");
        
                const dataWithDate = {
                    ...formData,
                    deadline: formattedDate, 
                };
        
                console.log("Submitting:", dataWithDate);
        
                const response = await fetch("http://localhost:8000/api/tasks", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dataWithDate),
                });
        
                if (!response.ok) {
                    throw new Error("Adding task failed");
                }
        
                const result = await response.json();
                console.log("Task added successfully:", result);
                
                setTasks((prev) => [...prev, result]);
                reset()
            } catch (error: any) {
                setError("root", { message: error.message });
            }
        };
  return (
    <div className='px-36 py-16'>
        <div id='left' className='float-left w-5/6 text-2xl font-semibold p-12'>
            <header className='flex justify-between'>
                <p>Hello, user!</p>
                <div className='flex gap-1'>
                    <Input type='text' placeholder='Search'></Input>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Add new task</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                            <DialogHeader>
                                <DialogTitle>Create new task</DialogTitle>
                            </DialogHeader>
                            <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">Title</Label>
                                <Input id="title" className="col-span-3" {...register("title", {
                                        required: "Title is required"
                                })}/>
                            </div>
                                {errors.title && (
                                    <p className='text-red-500 text-right'>{errors.title.message}</p>
                                )}

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">Description</Label>
                                <Textarea rows={5} id="description" className="col-span-3" {...register("description", {
                                        required: "Description is required"
                                })}/>
                            </div>
                                 {errors.description && (
                                    <p className='text-red-500 text-right' >{errors.description.message}</p>
                                )}

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="deadline" className="text-right">Deadline</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={(selectedDate) => {
                                                setDate(selectedDate);  // Update state
                                                setValue("deadline", selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""); // Update react-hook-form
                                                clearErrors("deadline"); 
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                                {errors.deadline?.message && <p className="text-red-500 text-right">{String(errors.deadline.message)}</p>}

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="priority" className="text-right">Priority</Label>
                                <Input id="priority" className="col-span-3" {...register("priority", {
                                    required: "Priority is required"
                                })} />
                            </div>
                                {errors.priority && (
                                    <p className='text-red-500 text-right'>{errors.priority.message}</p>
                                )}

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category" className="text-right">Category</Label>
                                <Input id="category" className="col-span-3" {...register("category", {
                                    required: "Category is required"
                                })}/>
                            </div>
                                {errors.category && (
                                    <p className='text-red-500 text-right'>{errors.category.message}</p>
                                )}
                            {errors.root && (
                                <p className='text-red-500 text-right'>{errors.root.message}</p>
                            )}
                            <DialogFooter>
                            <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Adding..." : "Add"}
                            </Button>
                            </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>                   
                </div>
            </header>
            <hr className='mt-4'/>
            <div>
                {tasks.length === 0 ? <div>Loading tasks...</div> : <TasksTable tasks={tasks} setTasks={setTasks} />}
            </div>
        </div>
        <div id='right' className='float-left w-1/6 border-[#09090B] p-12'>
            RIGHT
        </div>
    </div>
  )
}

export default Tasks