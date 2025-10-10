import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { uploadFile } from "../firebase/storage";
import { type Student } from "../types";

interface ModalStudent {
  id?: string;
  name: string;
  email: string;
  phone: string;
  enrollNumber: string;
  dateOfAdmission: string;
  avatar: string;
}

interface StudentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (student: ModalStudent) => void;
  initial?: Student;
}

export default function StudentModal({
  open,
  onClose,
  onSubmit,
  initial,
}: StudentModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [enrollNumber, setEnrollNumber] = useState("");
  const [dateOfAdmission, setDateOfAdmission] = useState("");
  const [avatar, setAvatar] = useState("/img/avatar.jpg");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initial) {
      setName(initial.name || "");
      setEmail(initial.email || "");
      setPhone(initial.phone || "");
      setEnrollNumber(initial.enrollNumber || "");
      setDateOfAdmission(initial.dateOfAdmission || "");
      setAvatar(initial.avatar || "/img/avatar.jpg");
    } else {
      setName("");
      setEmail("");
      setPhone("");
      setEnrollNumber("");
      setDateOfAdmission("");
      setAvatar("/img/avatar.jpg");
    }
  }, [initial, open]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);

    try {
      onSubmit({
        id: initial?.id,
        name,
        email,
        phone,
        enrollNumber,
        dateOfAdmission,
        avatar,
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setUploading(true);
        // Create a unique filename with timestamp
        const timestamp = Date.now();
        const fileName = `avatars/${timestamp}_${file.name}`;
        const downloadURL = await uploadFile(file, fileName);
        setAvatar(downloadURL);
      } catch (error) {
        console.error("Error uploading avatar:", error);
        // Fallback to local preview if upload fails
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && typeof e.target.result === "string") {
            setAvatar(e.target.result);
          }
        };
        reader.readAsDataURL(file);
      } finally {
        setUploading(false);
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{initial ? "Edit Student" : "Add Student"}</DialogTitle>
          <DialogDescription>
            {initial
              ? "Update the student information below."
              : "Add a new student to the system."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">Avatar</label>
            <div className="flex items-center gap-4">
              <img
                src={avatar}
                alt="avatar preview"
                className="w-16 h-16 rounded-lg object-cover border"
              />
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  accept="image/*"
                  className="text-sm"
                  onChange={handleAvatarChange}
                  disabled={uploading || saving}
                />
                {uploading && (
                  <span className="text-sm text-gray-500">Uploading...</span>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={saving}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={saving}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Phone</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={saving}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Enroll Number
              </label>
              <input
                type="text"
                required
                value={enrollNumber}
                onChange={(e) => setEnrollNumber(e.target.value)}
                disabled={saving}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">
                Date of admission
              </label>
              <input
                type="date"
                required
                value={dateOfAdmission}
                onChange={(e) => setDateOfAdmission(e.target.value)}
                disabled={saving}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 cursor-pointer rounded-lg border border-gray-300 disabled:opacity-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving || uploading}
              className="px-4 py-2 cursor-pointer rounded-lg bg-[#FEAF00] text-white disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
