"use client";

import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Clock,
  User,
  Plus,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Task = {
  id: number;
  title: string;
  time: string;
  assignee: string;
  done: boolean;
  priority: "high" | "medium" | "low";
};

const initialTasks: Task[] = [
  { id: 1, title: "Morning milking", time: "06:00", assignee: "Botir", done: true, priority: "high" },
  { id: 2, title: "Feed cattle", time: "07:30", assignee: "Akmal", done: true, priority: "high" },
  { id: 3, title: "Egg collection", time: "09:00", assignee: "Dilorom", done: false, priority: "high" },
  { id: 4, title: "Vet check — calves", time: "11:00", assignee: "Botir", done: false, priority: "medium" },
  { id: 5, title: "Clean chicken coop", time: "14:00", assignee: "Akmal", done: false, priority: "medium" },
  { id: 6, title: "Inventory count", time: "16:00", assignee: "Botir", done: false, priority: "low" },
];

const workers = [
  { name: "Botir", roleKey: "task_owner", tasks: 3 },
  { name: "Akmal", roleKey: "task_worker", tasks: 2 },
  { name: "Dilorom", roleKey: "task_worker", tasks: 1 },
];

export default function TaskManagement({ onBack }: { onBack: () => void }) {
  const { t } = useLanguage();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeView, setActiveView] = useState<"tasks" | "workers">("tasks");

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const priorityLabel = (p: string) => {
    if (p === "high") return t("task_priority_high");
    if (p === "medium") return t("task_priority_medium");
    return t("task_priority_low");
  };

  return (
    <div className="flex flex-col flex-1 pb-24">
      <div className="flex-1 flex flex-col px-5 pt-6 pb-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="w-fit">
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
          <button className="bg-green-800 text-white p-2.5 rounded-xl">
            <Plus size={20} />
          </button>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">{t("task_title")}</h1>
        <p className="text-sm text-gray-500 mb-5">{t("task_subtitle")}</p>

        <div className="flex bg-gray-100 rounded-xl p-1 mb-5">
          <button
            onClick={() => setActiveView("tasks")}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-colors ${
              activeView === "tasks" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
            }`}
          >
            {t("task_todo")}
          </button>
          <button
            onClick={() => setActiveView("workers")}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-colors ${
              activeView === "workers" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
            }`}
          >
            {t("task_workers")}
          </button>
        </div>

        {activeView === "tasks" ? (
          <div className="space-y-2 flex-1 overflow-y-auto">
            {tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className="w-full flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3.5 text-left"
              >
                {task.done ? (
                  <CheckCircle2 size={22} className="text-green-700 shrink-0" />
                ) : (
                  <Circle size={22} className="text-gray-300 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold truncate ${task.done ? "text-gray-400 line-through" : "text-gray-900"}`}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5 min-w-0">
                    <div className="flex items-center gap-1">
                      <Clock size={10} className="text-gray-400 shrink-0" />
                      <span className="text-xs text-gray-400 truncate">{task.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={10} className="text-gray-400 shrink-0" />
                      <span className="text-xs text-gray-400 truncate">{task.assignee}</span>
                    </div>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  task.priority === "high" ? "bg-red-50 text-red-500" :
                  task.priority === "medium" ? "bg-yellow-50 text-yellow-600" :
                  "bg-gray-100 text-gray-500"
                }`}>
                  {priorityLabel(task.priority)}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-3 flex-1 overflow-y-auto">
            {workers.map((worker, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-2xl p-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {worker.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">{worker.name}</p>
                    <span className="text-xs text-gray-400">{t(worker.roleKey)}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{worker.tasks} {t("task_tasks")}</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-xl bg-green-50 text-green-700 text-xs font-bold">
                    {t("task_assign_task")}
                  </button>
                  <button className="flex-1 py-2 rounded-xl bg-gray-50 text-gray-600 text-xs font-bold">
                    {t("task_view_tasks")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
