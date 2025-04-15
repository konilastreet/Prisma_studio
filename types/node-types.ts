// Types pour les données des nœuds

export interface IdeaNodeData {
  label: string;
  content: string;
  developedIdea?: string;
}

export interface SynopsisNodeData {
  label: string;
  content?: string;
  synopsis?: string;
  developedIdea?: string;
}

export interface StoryboardNodeData {
  label: string;
  synopsis?: string;
  scenes?: string[];
}

export interface PromptNodeData {
  label: string;
  scenes?: string[];
  prompts?: string[];
}

export interface ImageNodeData {
  label: string;
  prompts?: string[];
  images?: string[];
}

export interface CameraNodeData {
  label: string;
  scenes?: string[];
  images?: string[];
  cameraMovements?: string[];
}

export type NodeData = 
  | IdeaNodeData 
  | SynopsisNodeData 
  | StoryboardNodeData 
  | PromptNodeData 
  | ImageNodeData 
  | CameraNodeData;
