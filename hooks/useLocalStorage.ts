import { useState, useCallback } from 'react';

export const useLocalStorage = (storageKey: string) => {
  // Fonction pour sauvegarder des données dans le localStorage
  const saveToStorage = useCallback((key: string, data: any) => {
    try {
      // Récupérer les données existantes
      const existingData = localStorage.getItem(storageKey);
      const parsedData = existingData ? JSON.parse(existingData) : {};
      
      // Mettre à jour les données
      parsedData[key] = data;
      
      // Sauvegarder dans le localStorage
      localStorage.setItem(storageKey, JSON.stringify(parsedData));
      return true;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde dans localStorage:', error);
      return false;
    }
  }, [storageKey]);

  // Fonction pour charger des données depuis le localStorage
  const loadFromStorage = useCallback((key?: string) => {
    try {
      const data = localStorage.getItem(storageKey);
      if (!data) return null;
      
      const parsedData = JSON.parse(data);
      
      // Si une clé spécifique est fournie, retourner cette valeur
      if (key && key in parsedData) {
        return parsedData[key];
      }
      
      // Sinon retourner toutes les données
      return parsedData;
    } catch (error) {
      console.error('Erreur lors du chargement depuis localStorage:', error);
      return null;
    }
  }, [storageKey]);

  // Fonction pour supprimer des données du localStorage
  const removeFromStorage = useCallback((key: string) => {
    try {
      const data = localStorage.getItem(storageKey);
      if (!data) return false;
      
      const parsedData = JSON.parse(data);
      
      if (key in parsedData) {
        delete parsedData[key];
        localStorage.setItem(storageKey, JSON.stringify(parsedData));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erreur lors de la suppression depuis localStorage:', error);
      return false;
    }
  }, [storageKey]);

  return { saveToStorage, loadFromStorage, removeFromStorage };
};
