'use client';

import React, { useState, useRef } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from './ThemeProvider';
import { PencilIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { Modal } from './Modal';
import Image from 'next/image';

interface SidebarProps {
  isOpen: boolean;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'campaigns', label: 'Campanhas' },
  { id: 'demands', label: 'Demandas' },
  { id: 'calendar', label: 'Calendário' },
  { id: 'settings', label: 'Configurações' }
];

export default function Sidebar({ isOpen }: SidebarProps) {
  const { theme } = useTheme();
  const [showEditPhoto, setShowEditPhoto] = useState(false);
  const [showEditName, setShowEditName] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userName, setUserName] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userName') || 'Usuário SpotMKT';
    }
    return 'Usuário SpotMKT';
  });

  // Adicionar esta função para atualizar o nome
  const handleUpdateName = (newName: string) => {
    setUserName(newName);
    localStorage.setItem('userName', newName);
    setShowEditName(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSavePhoto = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfilePhoto(result);
        localStorage.setItem('profilePhoto', result);
      };
      reader.readAsDataURL(selectedFile);
    }
    setShowEditPhoto(false);
    setSelectedFile(null);
    if (photoInputRef.current) {
      photoInputRef.current.value = '';
    }
  };

  React.useEffect(() => {
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
      setProfilePhoto(savedPhoto);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <nav className={`w-64 border-r p-4 h-full flex flex-col transition-colors
      ${theme === 'dark' 
        ? 'bg-gray-800/90 border-gray-700 text-gray-200' 
        : 'bg-white/90 border-gray-200 text-gray-700'
      }`}
    >
      <div className="flex flex-col items-center mb-8">
        <div className="relative group">
          <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center overflow-hidden">
            {profilePhoto ? (
              <Image 
                src={profilePhoto} 
                alt="Foto de perfil" 
                className="w-full h-full object-cover"
                width={80} 
                height={80} 
              />
            ) : (
              <UserCircleIcon className="w-20 h-20 text-gray-400 dark:text-gray-500" />
            )}
          </div>
          
          <button 
            className={`absolute inset-0 flex items-center justify-center bg-black/50 rounded-full 
              opacity-0 group-hover:opacity-100 transition-opacity`}
            onClick={() => setShowEditPhoto(true)}
          >
            <PencilIcon className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="mt-3 relative group">
          <h3 className="text-lg font-medium">{userName}</h3>
          <button
            className={`absolute -right-6 top-1/2 -translate-y-1/2
              opacity-0 group-hover:opacity-100 transition-opacity`}
            onClick={() => setShowEditName(true)}
          >
            <PencilIcon className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300" />
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-4">
        {menuItems.map(item => (
          <a
            key={item.id}
            href="#"
            className={`block px-4 py-2 text-sm rounded-md transition-colors
              ${theme === 'dark'
                ? 'text-gray-200 hover:bg-gray-700'
                : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            {item.label}
          </a>
        ))}
      </div>
      
      <div className={`pt-4 border-t flex justify-center
        ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
      >
        <ThemeToggle />
      </div>

      <Modal
        isOpen={showEditPhoto}
        onClose={() => setShowEditPhoto(false)}
        title="Alterar foto"
        onSave={handleSavePhoto}
      >
        <input 
          ref={photoInputRef}
          type="file" 
          accept="image/*" 
          onChange={handleFileSelect}
          className={`mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
            file:text-sm file:font-medium
            ${theme === 'dark'
              ? 'file:bg-gradient-to-r file:from-blue-500 file:to-purple-500 file:text-white text-gray-300'
              : 'file:bg-gradient-to-r file:from-blue-500 file:to-purple-500 file:text-white text-gray-600'
            }
            hover:file:opacity-90 cursor-pointer`}
        />
      </Modal>

      <Modal
        isOpen={showEditName}
        onClose={() => setShowEditName(false)}
        title="Alterar nome"
        onSave={() => handleUpdateName(userName)}
      >
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className={`w-full p-3 rounded-lg border transition-all mb-4
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${theme === 'dark'
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-gray-700'
            }`}
        />
      </Modal>
    </nav>
  );
}
