import { useState, useEffect, useRef } from 'react';
import { Edit, User } from 'lucide-react';

export const Account = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    avatar: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('profileData');
    if (savedData) {
      setProfileData(JSON.parse(savedData));
    } else {
      // Datos por defecto del usuario de prueba
      const defaultData = {
        name: 'Usuario de Prueba',
        email: 'example@example.com',
        avatar: '',
      };
      setProfileData(defaultData);
      localStorage.setItem('profileData', JSON.stringify(defaultData));
    }
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newProfileData = {
          ...profileData,
          avatar: reader.result as string,
        };
        setProfileData(newProfileData);
        localStorage.setItem('profileData', JSON.stringify(newProfileData));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: 'name' | 'email', value: string) => {
    const newProfileData = {
      ...profileData,
      [field]: value,
    };
    setProfileData(newProfileData);
    localStorage.setItem('profileData', JSON.stringify(newProfileData));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col items-center w-full gap-6 py-8">
        {/* Foto de perfil */}
        <div className="relative">
          <button
            type="button"
            onClick={handleAvatarClick}
            className="relative flex items-center justify-center w-32 h-32 overflow-hidden transition-colors bg-gray-200 border-4 border-gray-300 rounded-full hover:border-primary-500"
            aria-label="Cambiar foto de perfil"
          >
            {profileData.avatar ? (
              <img
                src={profileData.avatar}
                alt="Foto de perfil"
                className="object-cover w-full h-full"
              />
            ) : (
              <User className="w-16 h-16 text-gray-400" />
            )}
          </button>
          <div className="absolute bottom-0 right-0 flex items-center justify-center w-10 h-10 border-2 border-white rounded-full bg-primary-500">
            <Edit width={16} height={16} color="#ffffff" />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            aria-label="Seleccionar imagen de perfil"
          />
        </div>

        {/* Formulario de datos */}
        <div className="flex flex-col w-full gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">Nombre</span>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full h-12 px-4 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Tu nombre"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">
              Correo electrónico
            </span>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full h-12 px-4 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="tu@email.com"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
