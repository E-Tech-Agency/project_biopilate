import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle ,LibraryBig} from "lucide-react";
import SessionPlanningModal from "./SessionPlanningModal";
import api from "@/lib/api";
import { CoursePlanning } from "@/types/types";
import SessionRow from "./SessionRow";

interface SessionManagementButtonProps {
  plan: CoursePlanning;
  onSessionUpdate: () => void;
}

export default function SessionManagementButton({ plan, onSessionUpdate }: SessionManagementButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"list" | "add">("list");
  const [sessions, setSessions] = useState<any[]>([]);

  const handleButtonClick = async () => {
    try {
      const res = await api.get(`course-list-planning/${plan.id}/sessions/`);
      setSessions(res.data);
      setModalMode("list");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching sessions", error);
    }
  };

  

  const handleAddSession = () => {
    setModalMode("add");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalMode("list");
    onSessionUpdate();
  };

  const handleDeleteSession = async (sessionId: number) => {
    try {
      await api.delete(`session-detail/${sessionId}/`);
      const res = await api.get(`course-list-planning/${plan.id}/sessions/`);
      setSessions(res.data);
    } catch (error) {
      console.error("Error deleting session", error);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className="hover:bg-blue-50 px-3 flex items-center"
        onClick={handleButtonClick}
      >
        <LibraryBig className="w-4 h-4 text-blue-600 mr-2" />
        Gérer les Sessions
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {modalMode === "list" ? "Gestion des Sessions" : "Ajouter une Session"}
              <p className="text-sm text-muted-foreground mt-1">
                {plan.title}
              </p>
            </DialogTitle>
          </DialogHeader>

          {modalMode === "list" ? (
            <>
              <div className="flex justify-end mb-4">
                <Button
                  variant="outline"
                  className="hover:bg-green-50"
                  onClick={handleAddSession}
                >
                  <PlusCircle className="w-4 h-4 text-green-600 mr-2" />
                  Nouvelle Session
                </Button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date de début</TableHead>
                      <TableHead>Date de fin</TableHead>
                      <TableHead>Horaires</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sessions.length > 0 ? (
                      sessions.map((session) => (
                        <SessionRow 
                        key={session.id} 
                        session={session} 
                        onDelete={handleDeleteSession} 
                      />
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8">
                          Aucune session disponible
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleCloseModal}>
                  Fermer
                </Button>
              </DialogFooter>
            </>
          ) : (
            <SessionPlanningModal
              isOpen={true}
              onClose={() => setModalMode("list")}
              courseId={plan.id}
              courseDetails={plan}
              onSave={async () => {
                const res = await api.get(`session-detail/`);
                setSessions(res.data);
                setModalMode("list");
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}