import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import api from "@/lib/api";
import { SessionPlanningForm, CoursePlanning } from "@/types/types";

interface TimeSlot {
  date: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

interface SessionPlanningModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: number;
  courseDetails?: CoursePlanning;
  onSave: () => void;
}

export default function SessionPlanningModal({
  isOpen,
  onClose,
  courseId,
  courseDetails,
  onSave,
}: SessionPlanningModalProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const dates: TimeSlot[] = [];

      let currentDate = new Date(start);
      while (currentDate <= end) {
        dates.push({
          date: currentDate.toISOString().split("T")[0],
          startTime: "09:00",
          endTime: "14:00",
          isActive: true,
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      setTimeSlots(dates);
    }
  }, [startDate, endDate]);

  
  const formatSchedule = (): string => {
  return timeSlots
    .map((slot) => {
      const date = new Date(slot.date);
      const formattedDate = date.toLocaleDateString("fr-FR", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      if (!slot.isActive) {
        return `  - ${formattedDate}: OFF`; // Mark as "OFF" if inactive
      }

      return `  - ${formattedDate}: ${convertTo12Hour(slot.startTime)} - ${convertTo12Hour(slot.endTime)}`;
    })
    .join("\n");
};


  const convertTo12Hour = (time24: string): string => {
    const [hours, minutes] = time24.split(":");
    console.log(minutes);
    
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12} ${ampm}`;
  };

  const handleRemoveDay = (index: number) => {
    const newSlots = [...timeSlots];
    newSlots[index].isActive = false;
    setTimeSlots(newSlots);
  };

  const handleRestoreDay = (index: number) => {
    const newSlots = [...timeSlots];
    newSlots[index].isActive = true;
    setTimeSlots(newSlots);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const schedule = `- Start Date: ${new Date(startDate).toLocaleDateString("fr-FR")}\n` +
      `- End Date: ${new Date(endDate).toLocaleDateString("fr-FR")}\n` +
      `- Schedule:\n${formatSchedule()}`;

    const formData: SessionPlanningForm = {
      course: courseId,
      start_date: startDate,
      end_date: endDate,
      schedule: schedule,
    };

    try {
      await api.post("session-detail/", formData);
      onSave();
      onClose();
    } catch (error) {
      console.error("Error creating session planning", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Ajouter une Session</DialogTitle>
          {courseDetails && (
            <p className="text-sm text-muted-foreground">Pour: {courseDetails.title}</p>
          )}
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="start_date">Date de début</label>
              <Input
                id="start_date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="end_date">Date de fin</label>
              <Input
                id="end_date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>

          {timeSlots.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium">Horaires par jour</h3>
              <div className="space-y-2">
                {timeSlots.map((slot, index) => (
                  <div
                    key={slot.date}
                    className={`grid grid-cols-4 gap-2 items-center ${!slot.isActive ? "opacity-50" : ""}`}
                  >
                    <div className="font-medium">
                      {new Date(slot.date).toLocaleDateString("fr-FR", {
                        weekday: "short",
                        day: "2-digit",
                        month: "2-digit",
                      })}
                    </div>
                    {slot.isActive ? (
                      <>
                        <Input
                          type="time"
                          value={slot.startTime}
                          onChange={(e) => {
                            const newSlots = [...timeSlots];
                            newSlots[index].startTime = e.target.value;
                            setTimeSlots(newSlots);
                          }}
                        />
                        <Input
                          type="time"
                          value={slot.endTime}
                          onChange={(e) => {
                            const newSlots = [...timeSlots];
                            newSlots[index].endTime = e.target.value;
                            setTimeSlots(newSlots);
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => handleRemoveDay(index)}
                          className="hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleRestoreDay(index)}
                        className="col-span-3"
                      >
                        OFF
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <button type="submit"                className=" flex reserver-button text-sm sm:text-base font-bold font-lato rounded-lg  py-2 sm:py-3 bg-bgColor text-marron  duration-300 ease-in-out transform"
            >Enregistrer</button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
