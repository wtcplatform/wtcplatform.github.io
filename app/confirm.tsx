import { AiFillCheckSquare } from "react-icons/ai";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"

export default function ConfirmComponent() {
    return (
        
        <Card className="w-full max-w-lg">
        <CardHeader className="pb-0">
        <div className="flex items-center space-x-4">
            <AiFillCheckSquare className="w-8 h-8"/>
            <CardTitle>コート確定</CardTitle>
        </div>
        </CardHeader>
        <CardContent className="flex gap-4 items-start py-4">
        </CardContent>
        </Card>
    )
}
