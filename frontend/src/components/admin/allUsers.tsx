import api from '@/lib/api';
import { UserType } from '@/types/types';
import { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '../ui/button';
import { toast } from 'sonner';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AllUsers() {
    const [reason, setReason] = useState({ reason: "" });
    const [users, setUsers] = useState<UserType[] | null>(null);
    const getUsers = async () => {
        try {
            const res = await api('users/all/');
            setUsers(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUsers();
    }, [])
    const deleteUser = async (id: number) => {
        try {
            await api.delete(`delete_user/${id}/`, reason);
            await getUsers();
            toast.success("User deleted");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Card>
            <CardHeader className="px-7">
                <CardTitle>Users</CardTitle>
                <CardDescription>Recent users from your store.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead className="hidden sm:table-cell">Sign in method</TableHead>
                            <TableHead className="hidden sm:table-cell">Status</TableHead>
                            <TableHead className="hidden md:table-cell">Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            users && users.map((user: UserType) => (
                                <TableRow key={user.id} className="bg-accent">
                                    <TableCell>
                                        <div className="font-medium">{user.first_name} {user.last_name}</div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            {user.email}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">{user.auth_provider}</TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        {user.is_verified ?
                                            <Badge className="text-xs" variant="default">
                                                verified
                                            </Badge> :
                                            <Badge className="text-xs" variant="destructive">
                                                unverified
                                            </Badge>
                                        }
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{new Date(user.date_joined).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="destructive">Ban</Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-md">
                                                <DialogHeader>
                                                    <DialogTitle>Send email</DialogTitle>
                                                    <DialogDescription>
                                                        Send email to user to tell thel the reaseon for banning them.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="flex items-center space-x-2">
                                                    <div className="grid flex-1 gap-2">
                                                        <Label htmlFor="link" className="sr-only">
                                                            email
                                                        </Label>
                                                        <Input
                                                            id="email"
                                                            placeholder='email'
                                                            onChange={(e) => setReason({ ...reason, reason: e.target.value })}
                                                            value={reason.reason}
                                                        />
                                                    </div>
                                                    <Button disabled={reason.reason === "" ? true : false}
                                                        variant={"destructive"}
                                                        type="submit"
                                                        size="sm"
                                                        className="px-3"
                                                        onClick={() => deleteUser(user.id)}
                                                    >
                                                        Send
                                                    </Button>
                                                </div>
                                                <DialogFooter className="sm:justify-start">
                                                    <DialogClose asChild>
                                                        <Button type="button" variant="secondary">
                                                            Close
                                                        </Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
