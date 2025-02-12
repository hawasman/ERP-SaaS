import Image from "next/image";
import { create } from "zustand";
import { Badge } from "~/components/ui/badge";
import {
    Dialog,
    DialogContent, DialogHeader
} from "~/components/ui/dialog";
import { type DialogState } from "~/types/dialog-state";

export type Employee = {
    id: number;
    name: string;
    position: string;
    department: string;
    status: "Active" | "Inactive" | "OnLeave" | "Terminated";
    joinDate: string;
    salary: number;
    phone: string | null;
    email: string | null;
    address: string | null;
    picture: string | null;
    notes: string | null;
};

export const useViewEmployeeDialogState = create<DialogState<Employee>>((set) => ({
    isOpen: false,
    toggleModal: () =>
        set((state: DialogState<Employee>) => ({ isOpen: !state.isOpen })),
    data: null,
    setData: (data: Employee) => set(() => ({ data: data })),
}));

export default function ViewEmployeeDialog(
    props: Pick<DialogState<Employee>, "isOpen" | "data" | "toggleModal">
) {
    const employee = props.data!;
    return (
        <Dialog open={props.isOpen} onOpenChange={props.toggleModal}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <div className="space-y-2">
                        <h2 className="text-lg font-bold">Employee Profile</h2>
                        <p className="text-sm leading-none text-gray-500">Viewing employee profile</p>
                    </div>
                </DialogHeader>
                <div className="flex items-center space-x-5 py-5">
                    <div className="w-12 h-12 relative">
                        <Image
                            src="/placeholder.svg"
                            width="80"
                            height="80"
                            alt="Avatar"
                            className="rounded-full object-cover ring-2 ring-white"
                            style={{ aspectRatio: "80/80", objectFit: "cover" }}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <h3 className="text-base font-semibold">{employee.name}</h3>
                        <p className="text-sm leading-none text-gray-500">{employee.position}</p>
                    </div>
                </div>
                <div className="grid gap-1.5 mt-4">
                    <div className="grid grid-cols-2 items-center gap-2">
                        <div className="text-sm font-semibold">Email</div>
                        <div className="text-sm font-medium">{employee.email ?? "N/A"}</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-2">
                        <div className="text-sm font-semibold">Phone</div>
                        <div className="text-sm font-medium">{employee.phone ?? "N/A"}</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-2">
                        <div className="text-sm font-semibold">Address</div>
                        <div className="text-sm font-medium">{employee.address ?? "N/A"}</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-2">
                        <div className="text-sm font-semibold">Join Date</div>
                        <div className="text-sm font-medium">{employee.joinDate}</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-2">
                        <div className="text-sm font-semibold">Salary</div>
                        <div className="text-sm font-medium">{employee.salary.toLocaleString("en-US", { style: "currency", currency: "USD" })}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-semibold">Notes</div>
                        <div className="text-sm font-medium border rounded shadow-sm p-2">some random notes</div>
                    </div>
                </div>
                {/* <div className="grid gap-1.5 mt-4">
                            <div className="text-sm font-semibold">Skills</div>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline">React</Badge>
                                <Badge variant="outline">TypeScript</Badge>
                                <Badge variant="outline">Tailwind CSS</Badge>
                            </div>
                        </div> */}
                <div className="grid gap-1.5 mt-4">
                    <div className="grid gap-1.5">
                        <div className="text-sm font-semibold">Status</div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline">{employee.status}</Badge>
                        </div>
                    </div>
                    <div className="grid gap-1.5">
                        <div className="text-sm font-semibold">Recent Projects Completed</div>
                        <div className="flex items-center gap-2">
                            <Badge>Agile Scrum Master</Badge>
                            <Badge>CI/CD</Badge>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}