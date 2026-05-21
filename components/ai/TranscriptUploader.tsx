"use client";

import React, { useState, useRef } from "react";
import { Upload, FileText, CheckCircle2, AlertCircle, RefreshCw, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AITranscript } from "./types";
import { sampleTranscript, libraryTranscripts } from "./mockData";

interface TranscriptUploaderProps {
  onUploadStart: () => void;
  onUploadProgress: (progress: number) => void;
  onUploadComplete: (transcript: AITranscript) => void;
  onSelectHistorical: (transcript: AITranscript) => void;
  currentTranscriptId?: string;
}

export default function TranscriptUploader({
  onUploadStart,
  onUploadProgress,
  onUploadComplete,
  onSelectHistorical,
  currentTranscriptId,
}: TranscriptUploaderProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  
  // Metadados editáveis
  const [meetingTitle, setMeetingTitle] = useState("Ata de Reunião Operacional");
  const [department, setDepartment] = useState("Operações");
  const [processTag, setProcessTag] = useState("Connectivity Provisioning");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const startSimulatedUpload = (fileName: string, fileSizeStr: string) => {
    setIsUploading(true);
    setProgress(0);
    setUploadedFile(fileName);
    onUploadStart();

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 15) + 5;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            const generatedTranscript: AITranscript = {
              id: "transcript-hit-conn",
              fileName: fileName,
              fileSize: fileSizeStr,
              meetingTitle: meetingTitle || "Alinhamento e Dores de Implantação de Conectividade HIT",
              department: department || "Operações & CS",
              processTag: processTag || "Connectivity Provisioning",
              uploadedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
              content: sampleTranscript.content,
            };
            onUploadComplete(generatedTranscript);
          }, 400);
          return 100;
        }
        onUploadProgress(next);
        return next;
      });
    }, 150);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      startSimulatedUpload(file.name, `${sizeMB} MB`);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      startSimulatedUpload(file.name, `${sizeMB} MB`);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const loadSample = () => {
    setMeetingTitle(sampleTranscript.meetingTitle);
    setDepartment(sampleTranscript.department);
    setProcessTag(sampleTranscript.processTag || "Connectivity Provisioning");
    startSimulatedUpload(sampleTranscript.fileName, sampleTranscript.fileSize);
  };

  return (
    <div className="space-y-6">
      {/* Container de Drag-and-Drop */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={!isUploading ? triggerFileInput : undefined}
        className={`relative overflow-hidden group cursor-pointer border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          isDragActive
            ? "border-accent bg-accent/5 scale-[1.01]"
            : "border-border hover:border-accent/40 bg-secondary/20 hover:bg-secondary/40"
        } ${isUploading ? "pointer-events-none" : ""}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.docx,.pdf,.md"
          className="hidden"
          onChange={handleFileInput}
          disabled={isUploading}
        />

        <AnimatePresence mode="wait">
          {isUploading ? (
            <motion.div
              key="uploading"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 py-4"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto animate-spin">
                <RefreshCw className="w-6 h-6 text-accent" />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-primary">Analisando Transcrição por IA...</h4>
                <p className="text-[11px] text-muted-foreground">
                  Processando &quot;{uploadedFile}&quot; ({progress}%)
                </p>
              </div>

              {/* Barra de Progresso Customizada */}
              <div className="max-w-xs mx-auto h-2 bg-secondary rounded-full overflow-hidden border border-border">
                <motion.div
                  className="h-full bg-accent"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="w-14 h-14 rounded-full bg-accent/5 border border-border group-hover:border-accent/30 flex items-center justify-center mx-auto transition-all shadow-sm">
                <Upload className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-xs text-primary leading-snug">
                  Arraste a ata da reunião ou clique para navegar
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Suporta arquivos TXT, PDF, DOCX ou MD de até 25MB
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 border border-accent/30 text-accent font-bold text-[10px] uppercase rounded-full group-hover:scale-105 transition-transform">
                Carregar Arquivo Local
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Inputs de Metadados Opcionais para Customização antes de enviar */}
      {!isUploading && (
        <div className="rounded-xl border border-border bg-background p-4 space-y-3 shadow-sm">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-black block">
            Metadados de Extração (Opcional)
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground font-bold block">Título da Reunião</label>
              <input
                type="text"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                placeholder="Ex: Ata de Handoff"
                className="w-full text-[11px] px-2.5 py-1.5 bg-secondary/40 border border-border rounded focus:outline-none focus:border-accent font-semibold text-primary"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground font-bold block">Setor / Departamento</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Ex: Operações & CS"
                className="w-full text-[11px] px-2.5 py-1.5 bg-secondary/40 border border-border rounded focus:outline-none focus:border-accent font-semibold text-primary"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground font-bold block">Nome do Processo</label>
              <input
                type="text"
                value={processTag}
                onChange={(e) => setProcessTag(e.target.value)}
                placeholder="Ex: Connectivity Provisioning"
                className="w-full text-[11px] px-2.5 py-1.5 bg-secondary/40 border border-border rounded focus:outline-none focus:border-accent font-semibold text-primary"
              />
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between gap-4">
            <span className="text-[10px] text-muted-foreground italic font-medium">
              Dica: Você pode simular instantaneamente com o arquivo real de implantação da HIT.
            </span>
            <button
              type="button"
              onClick={loadSample}
              className="px-3 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 text-[10px] font-black uppercase rounded shadow-sm transition-all cursor-pointer inline-flex items-center gap-1.5 shrink-0"
            >
              <Layers className="w-3.5 h-3.5" />
              Simular com Ata HIT Real
            </button>
          </div>
        </div>
      )}

      {/* Histórico / Biblioteca de Documentos */}
      <div className="space-y-3">
        <h4 className="font-black text-xs uppercase tracking-wider text-primary">
          Histórico e Repositório Corporativo
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {libraryTranscripts.map((t) => {
            const isSelected = currentTranscriptId === t.id;
            return (
              <div
                key={t.id}
                onClick={() => !isUploading && onSelectHistorical(t)}
                className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "border-accent bg-accent/5 ring-1 ring-accent/30 shadow-md"
                    : "border-border bg-background hover:bg-secondary/40 hover:border-accent/30"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className={`p-1.5 rounded ${isSelected ? "bg-accent/15 text-accent" : "bg-secondary text-muted-foreground"}`}>
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 overflow-hidden">
                    <span className="text-[11px] font-bold text-primary truncate block leading-snug">
                      {t.meetingTitle}
                    </span>
                    <div className="flex items-center gap-2 text-[9px] text-muted-foreground font-semibold">
                      <span className="bg-secondary px-1.5 py-0.5 rounded border border-border text-[8px] uppercase tracking-wide">
                        {t.department}
                      </span>
                      <span>{t.fileSize}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
