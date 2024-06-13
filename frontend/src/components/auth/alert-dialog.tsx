import {
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function AlertDialogAfterRegister({ setAlert }: { setAlert: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Register Successfull</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action is necessary to complete the registration process
                        please try to sign in now to ensure that everything is working
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={()=>setAlert(false)}>accept</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </>
    )
}
