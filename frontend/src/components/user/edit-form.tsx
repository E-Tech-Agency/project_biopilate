import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from "@/lib/api"
import { User } from "@/types/types"
import { useEffect, useState } from "react"
import { Switch } from "../ui/switch"

export function EditForm() {
    const [user, setUser] = useState<User>({});
    useEffect(() => {
        async function fetchUser() {
            const res = await api.get("get_one_user/")
            setUser(res.data)
        }
        fetchUser()
    }, [])
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await api.patch("update_user/", user)
            console.log(res.data)

        } catch (error) {
            console.log(error)

        }
    }
    return (
        <Card className="mt-4 mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Edit Profile</CardTitle>
                <CardDescription>
                    Edit your profile information
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">First name</Label>
                                <Input id="first-name" defaultValue={user?.first_name} onChange={(e) => setUser({ ...user, first_name: e.target.value })} placeholder="John" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input id="last-name" defaultValue={user?.last_name} onChange={(e) => setUser({ ...user, last_name: e.target.value })} required />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                defaultValue={user?.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                required
                            />
                        </div>
                        {user.is_supplier === false &&
                            <div className="flex items-center space-x-2">
                                <Switch id="supplier-checked" defaultChecked={user.is_supplier} onCheckedChange={(checked) => setUser({ ...user, is_supplier: checked })} />
                                <Label htmlFor="supplier-checked">Do you want to be a supplier?</Label>
                            </div>
                        }
                        <Button type="submit" className="w-full">
                            Create an account
                        </Button>
                    </div>
                </CardContent>
            </form>

        </Card>
    )
}
