import { Plus } from "lucide-react";
import { Button } from "../ui/button";

export default function CreateTransaction() {
    return (
        <Button size="sm" className="cursor-pointer text-xs">
            <Plus className="size-3"/> Add
        </Button>
    )
}