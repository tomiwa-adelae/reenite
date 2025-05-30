import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Home, 
  User, 
  Settings, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  Star, 
  Heart,
  Camera, 
  Image, 
  Video, 
  Music, 
  Download, 
  Upload, 
  Share, 
  Copy, 
  Edit, 
  Trash2,
  Plus, 
  Minus, 
  Check, 
  X, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight,
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  Save, 
  Folder, 
  File, 
  FileText,
  Globe, 
  Wifi, 
  Battery, 
  Volume2, 
  Sun, 
  Moon, 
  Cloud, 
  Zap,
  Shield, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  Bell, 
  BellOff, 
  MessageCircle
} from 'lucide-react';

const IconPicker = ({ onIconSelect, selectedIcon = null, placeholder = "Select an icon" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Available icons with their names
  const availableIcons = [
    { name: 'Home', component: Home },
    { name: 'User', component: User },
    { name: 'Settings', component: Settings },
    { name: 'Mail', component: Mail },
    { name: 'Phone', component: Phone },
    { name: 'Calendar', component: Calendar },
    { name: 'Clock', component: Clock },
    { name: 'Star', component: Star },
    { name: 'Heart', component: Heart },
    { name: 'Camera', component: Camera },
    { name: 'Image', component: Image },
    { name: 'Video', component: Video },
    { name: 'Music', component: Music },
    { name: 'Download', component: Download },
    { name: 'Upload', component: Upload },
    { name: 'Share', component: Share },
    { name: 'Copy', component: Copy },
    { name: 'Edit', component: Edit },
    { name: 'Trash', component: Trash2 },
    { name: 'Plus', component: Plus },
    { name: 'Minus', component: Minus },
    { name: 'Check', component: Check },
    { name: 'X', component: X },
    { name: 'ChevronDown', component: ChevronDown },
    { name: 'ChevronUp', component: ChevronUp },
    { name: 'ChevronLeft', component: ChevronLeft },
    { name: 'ChevronRight', component: ChevronRight },
    { name: 'ArrowUp', component: ArrowUp },
    { name: 'ArrowDown', component: ArrowDown },
    { name: 'ArrowLeft', component: ArrowLeft },
    { name: 'ArrowRight', component: ArrowRight },
    { name: 'Save', component: Save },
    { name: 'Folder', component: Folder },
    { name: 'File', component: File },
    { name: 'FileText', component: FileText },
    { name: 'Globe', component: Globe },
    { name: 'Wifi', component: Wifi },
    { name: 'Battery', component: Battery },
    { name: 'Volume', component: Volume2 },
    { name: 'Sun', component: Sun },
    { name: 'Moon', component: Moon },
    { name: 'Cloud', component: Cloud },
    { name: 'Zap', component: Zap },
    { name: 'Shield', component: Shield },
    { name: 'Lock', component: Lock },
    { name: 'Unlock', component: Unlock },
    { name: 'Eye', component: Eye },
    { name: 'EyeOff', component: EyeOff },
    { name: 'Bell', component: Bell },
    { name: 'BellOff', component: BellOff },
    { name: 'Message', component: MessageCircle }
  ];

  // Filter icons based on search term
  const filteredIcons = useMemo(() => {
    if (!searchTerm) return availableIcons;
    return availableIcons.filter(icon => 
      icon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleIconSelect = (icon) => {
    onIconSelect(icon);
    setIsOpen(false);
    setSearchTerm('');
  };

  const SelectedIconComponent = selectedIcon?.component;

  return (
    <div className="relative w-full max-w-sm">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        <div className="flex items-center gap-3">
          {SelectedIconComponent ? (
            <>
              <SelectedIconComponent size={20} className="text-gray-600" />
              <span className="text-gray-900">{selectedIcon.name}</span>
            </>
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </div>
        <ChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          {/* Search Input */}
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search icons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Icons Grid */}
          <div className="max-h-64 overflow-y-auto">
            {filteredIcons.length > 0 ? (
              <div className="grid grid-cols-6 gap-1 p-3">
                {filteredIcons.map((icon) => {
                  const IconComponent = icon.component;
                  const isSelected = selectedIcon?.name === icon.name;
                  
                  return (
                    <button
                      key={icon.name}
                      type="button"
                      onClick={() => handleIconSelect(icon)}
                      className={`p-3 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        isSelected ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
                      }`}
                      title={icon.name}
                    >
                      <IconComponent size={20} />
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <Search size={24} className="mx-auto mb-2 opacity-50" />
                <p>No icons found</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

// Demo component to show usage
const IconPickerDemo = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Icon Picker Demo</h1>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose an Icon
          </label>
          <IconPicker 
            onIconSelect={setSelectedIcon}
            selectedIcon={selectedIcon}
            placeholder="Click to select an icon"
          />
        </div>

        {selectedIcon && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Selected Icon:</h3>
            <div className="flex items-center gap-3">
              <selectedIcon.component size={24} className="text-blue-600" />
              <span className="text-gray-900">{selectedIcon.name}</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              You can use this in your forms, settings, or anywhere you need icon selection.
            </p>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-2 text-blue-900">Usage Example:</h3>
          <pre className="text-sm bg-white p-3 rounded border overflow-x-auto">
{`import IconPicker from './components/IconPicker';

const [selectedIcon, setSelectedIcon] = useState(null);

<IconPicker 
  onIconSelect={setSelectedIcon}
  selectedIcon={selectedIcon}
  placeholder="Select an icon"
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default IconPickerDemo;