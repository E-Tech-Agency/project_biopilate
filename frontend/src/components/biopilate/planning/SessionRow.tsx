import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";

interface SessionRowProps {
  session: any;
  onDelete: (sessionId: number) => void;
}

export default function SessionRow({ session, onDelete }: SessionRowProps) {
  const [showSchedule, setShowSchedule] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>{new Date(session.start_date).toLocaleDateString()}</TableCell>
        <TableCell>{new Date(session.end_date).toLocaleDateString()}</TableCell>
        <TableCell>
          <Button
            variant="ghost"
            className="p-0 h-auto hover:bg-transparent"
            onClick={() => setShowSchedule(!showSchedule)}
          >
            {showSchedule ? (
              <ChevronUp className="w-4 h-4 text-gray-600 mr-2" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600 mr-2" />
            )}
            {showSchedule ? "Masquer" : "Voir plus"}
          </Button>
          {showSchedule && (
            <div className="mt-2 text-sm text-gray-600 whitespace-pre-line">
              {session.schedule}
            </div>
          )}
        </TableCell>
        <TableCell>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-red-50"
              onClick={() => onDelete(session.id)}
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}