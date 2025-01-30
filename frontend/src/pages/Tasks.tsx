
import { TasksTable } from "@/components/TasksTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Tasks = () => {
  return (
    <div className='px-36 py-16'>
        <div id='left' className='float-left w-4/5 text-2xl font-semibold p-12'>
            <header className='flex justify-between'>
                <p>Hello, user!</p>
                <div className='flex gap-1'>
                    <Input type='text' placeholder='Search'></Input>
                    <Button>Add new task</Button>
                </div>
            </header>
            <hr className='mt-4'/>
            <TasksTable />
        </div>
        <div id='right' className='float-left w-1/5 border-[#09090B] p-12'>
            RIGHT
        </div>
    </div>
  )
}

export default Tasks