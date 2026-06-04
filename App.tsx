import React, { useState, useEffect } from 'react';
import { 
  Language, 
  CoachInfo, 
  SessionInfo, 
  ActivityData, 
  SessionRecord, 
  PlayerLevel, 
  Certification,
  SeasonPhase,
  COUNTRIES
} from './types';
import { i18n } from './translations';
import { LanguageSelector } from './components/LanguageSelector';
import { OptionButton } from './components/OptionButton';
import { 
  User, 
  ClipboardList, 
  Plus, 
  Trash2, 
  Save, 
  History as HistoryIcon, 
  Calendar,
  Download,
  Edit2,
  XCircle,
  CheckCircle2,
  FolderOpen,
  Info,
  HelpCircle,
  Globe,
  Briefcase,
  Clock,
  Target,
  Users,
  Accessibility,
  Send,
  Loader2
} from 'lucide-react';

/**
