import { useState, useEffect } from "react";
import { format, isWithinInterval, isSameDay } from "date-fns";
import { CalendarNote, DateRange } from "@/src/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, StickyNote, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface CalendarNoteSectionProps {
  range: DateRange;
  currentDate: Date;
}

export function CalendarNoteSection({ range, currentDate }: CalendarNoteSectionProps) {
  const [notes, setNotes] = useState<CalendarNote[]>([]);
  const [newNote, setNewNote] = useState("");
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem("calendar-notes");
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error("Failed to parse notes", e);
      }
    }
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("calendar-notes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const note: CalendarNote = {
      id: Math.random().toString(36).substring(2, 9),
      date: range.start ? range.start.toISOString() : "general",
      content: newNote,
      createdAt: Date.now(),
    };

    setNotes([note, ...notes]);
    setNewNote("");
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
    if (expandedNoteId === id) setExpandedNoteId(null);
    if (editingNoteId === id) setEditingNoteId(null);
  };

  const handleEditNote = (note: CalendarNote) => {
    setEditingNoteId(note.id);
    setEditingContent(note.content);
  };

  const handleSaveEdit = (id: string) => {
    setNotes(notes.map(n => n.id === id ? { ...n, content: editingContent } : n));
    setEditingNoteId(null);
  };

  const toggleExpand = (id: string) => {
    if (expandedNoteId === id) {
      setExpandedNoteId(null);
      setEditingNoteId(null);
    } else {
      setExpandedNoteId(id);
    }
  };

  const filteredNotes = notes.filter((note) => {
    if (note.date === "general") return true;
    const noteDate = new Date(note.date);
    
    if (range.start && range.end) {
      return isWithinInterval(noteDate, { start: range.start, end: range.end });
    }
    if (range.start) {
      return isSameDay(noteDate, range.start);
    }
    return false;
  });

  return (
    <div className="w-full lg:w-[350px] border-t lg:border-t-0 lg:border-l border-calendar-border bg-zinc-50/50 flex flex-col h-full">
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-6">
          <StickyNote className="h-5 w-5 text-calendar-accent" />
          <h3 className="text-lg font-bold tracking-tight">Notes</h3>
        </div>

        <div className="space-y-4 mb-8">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-calendar-muted">
              {range.start ? (
                range.end ? (
                  `Notes for ${format(range.start, "MMM d")} - ${format(range.end, "MMM d")}`
                ) : (
                  `Note for ${format(range.start, "MMMM d")}`
                )
              ) : (
                "General Monthly Note"
              )}
            </label>
            <Textarea
              placeholder="Jot down something..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-[100px] bg-white border-calendar-border focus-visible:ring-calendar-accent resize-none"
            />
          </div>
          <Button 
            onClick={handleAddNote} 
            className="w-full bg-calendar-accent hover:bg-calendar-accent/90 text-white"
            disabled={!newNote.trim()}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Note
          </Button>
        </div>

        <div className="flex-1 min-h-0">
          <label className="text-xs font-bold uppercase tracking-widest text-calendar-muted block mb-4">
            Recent Activity
          </label>
          <ScrollArea className="h-[300px] lg:h-full pr-4">
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredNotes.length === 0 ? (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-calendar-muted italic text-center py-8"
                  >
                    No notes for this selection.
                  </motion.p>
                ) : (
                  filteredNotes.map((note, idx) => {
                    const isExpanded = expandedNoteId === note.id;
                    const isEditing = editingNoteId === note.id;
                    const tilt = idx % 2 === 0 ? 0.5 : -0.5;

                    return (
                      <motion.div
                        key={note.id}
                        layout
                        initial={{ opacity: 0, y: 10, rotate: tilt }}
                        animate={{ 
                          opacity: 1, 
                          y: 0, 
                          rotate: isExpanded ? 0 : tilt,
                          scale: isExpanded ? 1.02 : 1
                        }}
                        whileHover={!isExpanded && !isEditing ? { 
                          y: -5, 
                          rotate: 0, 
                          scale: 1.02,
                          transition: { duration: 0.2 }
                        } : {}}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="group"
                      >
                        <Card 
                          className={cn(
                            "border-calendar-border shadow-sm hover:shadow-xl transition-all duration-300 bg-white overflow-hidden cursor-pointer",
                            isExpanded && "ring-1 ring-calendar-accent shadow-2xl"
                          )}
                          onClick={() => !isEditing && toggleExpand(note.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <Badge variant="secondary" className="text-[10px] font-mono bg-zinc-100 text-zinc-500 border-none">
                                {note.date === "general" ? "General" : format(new Date(note.date), "MMM d, yyyy")}
                              </Badge>
                              <div className="flex gap-1">
                                {isExpanded && !isEditing && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditNote(note);
                                    }}
                                    className="h-6 w-6 text-zinc-400 hover:text-calendar-accent hover:bg-calendar-accent/10"
                                  >
                                    <Plus className="h-3.5 w-3.5 rotate-45" /> {/* Using Plus rotated as a placeholder for edit if needed, but let's just use text or another icon */}
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteNote(note.id);
                                  }}
                                  className={cn(
                                    "h-6 w-6 transition-opacity text-zinc-400 hover:text-destructive hover:bg-destructive/10",
                                    !isExpanded && "opacity-0 group-hover:opacity-100"
                                  )}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </div>
                            
                            {isEditing ? (
                              <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                                <Textarea
                                  value={editingContent}
                                  onChange={(e) => setEditingContent(e.target.value)}
                                  className="min-h-[80px] text-sm bg-zinc-50 border-calendar-border focus-visible:ring-calendar-accent resize-none"
                                  autoFocus
                                />
                                <div className="flex gap-2">
                                  <Button 
                                    size="sm" 
                                    className="h-7 text-[10px] bg-calendar-accent hover:bg-calendar-accent/90"
                                    onClick={() => handleSaveEdit(note.id)}
                                  >
                                    Save
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="h-7 text-[10px]"
                                    onClick={() => setEditingNoteId(null)}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <p className={cn(
                                "text-sm text-calendar-ink leading-relaxed",
                                !isExpanded && "line-clamp-2"
                              )}>
                                {note.content}
                              </p>
                            )}

                            {isExpanded && !isEditing && (
                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-4 pt-4 border-t border-zinc-100 flex justify-between items-center"
                              >
                                <span className="text-[10px] text-calendar-muted italic">
                                  Created {format(note.createdAt, "h:mm a")}
                                </span>
                                <Button 
                                  variant="link" 
                                  size="sm" 
                                  className="h-auto p-0 text-calendar-accent text-[10px] font-bold uppercase tracking-widest"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditNote(note);
                                  }}
                                >
                                  Edit Note
                                </Button>
                              </motion.div>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
