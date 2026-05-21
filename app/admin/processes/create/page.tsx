"use client";

import { cn } from "@/lib/utils";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  Flame,
  GitBranch,
  Layers,
  Network,
  Plus,
  Sliders,
  Sparkles,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// Definição das etapas do Wizard de Criação Guiada do Prompt 4
const WIZARD_STEPS = [
  { step: 1, label: "Setor", desc: "Selecione o departamento" },
  { step: 2, label: "Tipo", desc: "Defina o tipo (AS IS / TO BE)" },
  { step: 3, label: "Stakeholders", desc: "Adicione os donos envolvidos" },
  { step: 4, label: "Fluxo", desc: "Desenhe o fluxo do processo" },
  { step: 5, label: "Sistemas", desc: "Sistemas integrados" },
  { step: 6, label: "SLA", desc: "Prazos limites contratuais" },
  { step: 7, label: "Gargalos", desc: "Gargalos operacionais" },
  { step: 8, label: "KPIs", desc: "Métricas de acompanhamento" },
  { step: 9, label: "BPMN", desc: "Upload do arquivo XML" },
  { step: 10, label: "Publicar", desc: "Revisão geral do fluxo" },
];

export default function CreateProcessWizardPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [success, setSuccess] = useState(false);

  // Estados dos formulários de simulação
  const [form, setForm] = useState({
    title: "",
    department: "Customer Success",
    type: "TO_BE",
    description: "",
    owner: "William Lima",
    stakeholders: "",
    flowSteps: "",
    systems: "",
    slaHours: "48",
    bottlenecks: "",
    kpis: "SLA Compliance, Lead Time",
    bpmnFile: "Modelador_Processo_Draft.xml",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (currentStep < 10) {
      setCurrentStep(currentStep + 1);
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/processes");
      }, 3000);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-8 select-none">
      
      {/* 1. Header do Mapeador */}
      <div className="space-y-2 select-none border-b border-border pb-6">
        <Link
          href="/admin/processes"
          className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-accent hover:text-accent-hover transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar para Mapeamentos
        </Link>
        <h1 className="text-2xl md:text-3xl font-black text-primary tracking-tight">
          Modelador Guiado de Processos
        </h1>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Crie, mapeie e publique novos fluxos operacionais em nossa matriz de governança seguindo o manual oficial da HIT.
        </p>
      </div>

      {success ? (
        // 2. Estado de Sucesso ao Concluir Publicação
        <div className="rounded-xl border border-emerald-300 bg-emerald-500/5 p-8 text-center space-y-4 max-w-xl mx-auto animate-page-in select-none">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
          <h3 className="text-lg font-black text-primary">Processo Publicado com Sucesso!</h3>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
            O fluxo operacional <span className="font-bold text-primary">&quot;{form.title || "Processo Sem Nome"}&quot;</span> foi homologado pela IA de Process Mining e adicionado com 100% de integridade na governança. Redirecionando...
          </p>
        </div>
      ) : (
        // 3. Grid Principal do Wizard
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 select-none">
          
          {/* Menu Lateral de Etapas (Col-1) */}
          <div className="xl:col-span-1 rounded-xl border border-border bg-background p-5 space-y-4 max-h-fit">
            <h3 className="font-black text-xs uppercase tracking-wider text-primary border-b border-border pb-2">Etapas do Design</h3>
            
            <div className="space-y-3 font-semibold text-xs text-muted-foreground">
              {WIZARD_STEPS.map((s) => {
                const isActive = s.step === currentStep;
                const isCompleted = s.step < currentStep;

                return (
                  <div
                    key={s.step}
                    className={cn(
                      "flex items-center gap-3 p-2.5 rounded-lg border transition-all duration-200 select-none",
                      isActive
                        ? "border-accent bg-accent/5 text-accent shadow-sm"
                        : isCompleted
                        ? "border-emerald-300 bg-emerald-500/5 text-emerald-800 dark:text-emerald-300"
                        : "border-border hover:bg-secondary/40"
                    )}
                  >
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center font-black text-[9px] border",
                        isActive
                          ? "border-accent bg-accent text-white"
                          : isCompleted
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-border bg-secondary"
                      )}
                    >
                      {s.step}
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <span className="font-black block truncate leading-none">{s.label}</span>
                      <span className="text-[8px] text-[#7A7268] block truncate leading-none">{s.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form / Conteúdo da Etapa Ativa (Col-3) */}
          <div className="xl:col-span-3 rounded-xl border border-border bg-background p-6 flex flex-col justify-between min-h-[450px]">
            
            <div className="space-y-6">
              <div className="border-b border-border pb-3 flex items-center justify-between">
                <span className="text-xs font-black uppercase text-accent tracking-widest block">
                  Passo {currentStep} de 10 — {WIZARD_STEPS[currentStep - 1].desc}
                </span>
                <span className="text-[10px] font-black uppercase bg-secondary border border-border px-2 py-0.5 rounded text-muted-foreground">
                  Draft
                </span>
              </div>

              {/* RENDERIZAÇÃO CONDICIONAL DOS PASSOS DO WIZARD */}
              
              {/* Passo 1: Setor */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-page-in font-semibold text-xs">
                  <div className="space-y-1.5">
                    <label className="text-primary font-black uppercase text-[10px] block">Título do Processo</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Ex: Conciliação SAP de Faturamento"
                      value={form.title}
                      onChange={handleChange}
                      className="w-full h-10 px-3 bg-secondary/30 border border-border rounded-lg text-primary focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-primary font-black uppercase text-[10px] block">Departamento Vinculado</label>
                    <select
                      name="department"
                      value={form.department}
                      onChange={handleChange}
                      className="w-full h-10 px-3 bg-secondary/30 border border-border rounded-lg text-primary focus:outline-none focus:border-accent cursor-pointer"
                    >
                      <option value="Faturamento">Faturamento / Financeiro</option>
                      <option value="Customer Success">Customer Success</option>
                      <option value="Tecnologia / TI">Tecnologia / TI</option>
                      <option value="Compliance">Compliance / Operações</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Passo 2: Tipo */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-page-in font-semibold text-xs">
                  <label className="text-primary font-black uppercase text-[10px] block">Definição do Tipo de Fluxo</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => setForm({ ...form, type: "AS_IS" })}
                      className={cn(
                        "p-4 rounded-xl border-2 cursor-pointer flex flex-col justify-between gap-3 transition-all",
                        form.type === "AS_IS" ? "border-accent bg-accent/5 text-accent" : "border-border hover:bg-secondary/30"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-[#7A7268]" />
                        <span className="font-black text-sm text-primary">Estado Corrente (AS IS)</span>
                      </div>
                      <p className="text-muted-foreground text-[11px] leading-relaxed">
                        Mapeamento da situação atual de ineficiência, arquivos descentralizados, planilhas locais e latência operacional existente.
                      </p>
                    </div>

                    <div
                      onClick={() => setForm({ ...form, type: "TO_BE" })}
                      className={cn(
                        "p-4 rounded-xl border-2 cursor-pointer flex flex-col justify-between gap-3 transition-all",
                        form.type === "TO_BE" ? "border-accent bg-accent/5 text-accent" : "border-border hover:bg-secondary/30 animate-pulse"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-accent" />
                        <span className="font-black text-sm text-primary">Design Alvo (TO BE)</span>
                      </div>
                      <p className="text-muted-foreground text-[11px] leading-relaxed">
                        Desenho da jornada otimizada idealizada, utilizando automações de barramentos de API, Service Tasks automatizadas e suporte a IA.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Passo 3: Stakeholders */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-page-in font-semibold text-xs">
                  <div className="space-y-1.5">
                    <label className="text-primary font-black uppercase text-[10px] block">Proprietário Principal (Owner)</label>
                    <input
                      type="text"
                      name="owner"
                      value={form.owner}
                      onChange={handleChange}
                      className="w-full h-10 px-3 bg-secondary/30 border border-border rounded-lg text-primary focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-primary font-black uppercase text-[10px] block">Donos Envolvidos / Coproprietários (Separados por vírgula)</label>
                    <textarea
                      name="stakeholders"
                      rows={3}
                      placeholder="Ex: Carlos Ramos (Infra), Beatriz Mello (Finanças)"
                      value={form.stakeholders}
                      onChange={handleChange}
                      className="w-full p-3 bg-secondary/30 border border-border rounded-lg text-primary focus:outline-none focus:border-accent leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* Passo 4: Fluxo */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-page-in font-semibold text-xs">
                  <div className="space-y-1.5">
                    <label className="text-primary font-black uppercase text-[10px] block">Descrição e Objetivo do Processo</label>
                    <textarea
                      name="description"
                      rows={3}
                      placeholder="Ex: Conciliação completa de extratos no SAP com leituras por IA..."
                      value={form.description}
                      onChange={handleChange}
                      className="w-full p-3 bg-secondary/30 border border-border rounded-lg text-primary focus:outline-none focus:border-accent leading-relaxed"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-primary font-black uppercase text-[10px] block">Sequência de Etapas e Handoffs</label>
                    <textarea
                      name="flowSteps"
                      rows={3}
                      placeholder="Ex: 1. Coleta -> 2. Triagem -> 3. Lançamento SAP -> 4. Fechamento"
                      value={form.flowSteps}
                      onChange={handleChange}
                      className="w-full p-3 bg-secondary/30 border border-border rounded-lg text-primary focus:outline-none focus:border-accent leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* Passo 5: Sistemas */}
              {currentStep === 5 && (
                <div className="space-y-4 animate-page-in font-semibold text-xs">
                  <div className="space-y-1.5">
                    <label className="text-primary font-black uppercase text-[10px] block">Sistemas e APIs Envolvidos (Separados por vírgula)</label>
                    <input
                      type="text"
                      name="systems"
                      placeholder="Ex: SAP ERP, Microsoft OneDrive, Salesforce"
                      value={form.systems}
                      onChange={handleChange}
                      className="w-full h-10 px-3 bg-secondary/30 border border-border rounded-lg text-primary focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
              )}

              {/* Passo 6: SLA */}
              {currentStep === 6 && (
                <div className="space-y-4 animate-page-in font-semibold text-xs">
                  <div className="space-y-1.5">
                    <label className="text-primary font-black uppercase text-[10px] block">Limite Contratual de Tempo de SLA (Horas)</label>
                    <input
                      type="number"
                      name="slaHours"
                      value={form.slaHours}
                      onChange={handleChange}
                      className="w-full h-10 px-3 bg-secondary/30 border border-border rounded-lg text-primary focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
              )}

              {/* Passo 7: Gargalos */}
              {currentStep === 7 && (
                <div className="space-y-4 animate-page-in font-semibold text-xs">
                  <div className="space-y-1.5">
                    <label className="text-primary font-black uppercase text-[10px] block">Gargalos Identificados e Causa Raiz</label>
                    <textarea
                      name="bottlenecks"
                      rows={4}
                      placeholder="Ex: Exportação e preenchimento manual de planilhas locais atrasa o faturamento em 72h."
                      value={form.bottlenecks}
                      onChange={handleChange}
                      className="w-full p-3 bg-secondary/30 border border-border rounded-lg text-primary focus:outline-none focus:border-accent leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* Passo 8: KPIs */}
              {currentStep === 8 && (
                <div className="space-y-4 animate-page-in font-semibold text-xs">
                  <div className="space-y-1.5">
                    <label className="text-primary font-black uppercase text-[10px] block">Indicadores e KPIs de Acompanhamento (Separados por vírgula)</label>
                    <input
                      type="text"
                      name="kpis"
                      value={form.kpis}
                      onChange={handleChange}
                      className="w-full h-10 px-3 bg-secondary/30 border border-border rounded-lg text-primary focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
              )}

              {/* Passo 9: BPMN */}
              {currentStep === 9 && (
                <div className="space-y-4 animate-page-in font-semibold text-xs select-none">
                  <label className="text-primary font-black uppercase text-[10px] block">Anexar Diagrama XML BPMN 2.0</label>
                  <div className="p-8 border-2 border-dashed border-border rounded-xl text-center space-y-3 bg-secondary/15 hover:border-accent/30 transition-colors">
                    <FileText className="w-10 h-10 text-accent mx-auto animate-pulse" />
                    <div className="space-y-1">
                      <span className="font-bold text-primary block">Arraste o arquivo XML do BPMN 2.0</span>
                      <span className="text-[10px] text-muted-foreground block">Tamanho limite: 10 MB • Formato: .xml, .bpmn</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 bg-accent text-white px-4 py-2 rounded-full font-black text-[9px] uppercase cursor-pointer select-none">
                      Selecionar Arquivo
                    </span>
                  </div>
                </div>
              )}

              {/* Passo 10: Publicar */}
              {currentStep === 10 && (
                <div className="space-y-6 animate-page-in font-semibold text-xs">
                  <div className="p-4 bg-accent/5 border border-accent/20 rounded-xl space-y-2 select-none">
                    <span className="font-bold text-accent flex items-center gap-1.5 uppercase text-[10px]">
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                      Revisão Geral do Design
                    </span>
                    <p className="text-muted-foreground leading-relaxed text-[11px]">
                      Certifique-se de que os dados de Lanes operacionais e SLAs limites estão em sincronia perfeita com as regras contratuais da HIT antes de disparar o provisionamento na governança.
                    </p>
                  </div>

                  <div className="divide-y divide-border border border-border rounded-xl overflow-hidden font-medium bg-secondary/5">
                    <div className="p-3.5 flex justify-between gap-4">
                      <span className="text-muted-foreground font-black uppercase text-[9px]">Processo Mapeado</span>
                      <span className="text-primary font-bold">{form.title || "Processo Sem Nome"}</span>
                    </div>
                    <div className="p-3.5 flex justify-between gap-4">
                      <span className="text-muted-foreground font-black uppercase text-[9px]">Departamento</span>
                      <span className="text-primary font-bold">{form.department}</span>
                    </div>
                    <div className="p-3.5 flex justify-between gap-4">
                      <span className="text-muted-foreground font-black uppercase text-[9px]">Tipo / Versão</span>
                      <span className="text-accent font-black">{form.type === "TO_BE" ? "TO BE (Design Ideal)" : "AS IS (Corrente)"}</span>
                    </div>
                    <div className="p-3.5 flex justify-between gap-4">
                      <span className="text-muted-foreground font-black uppercase text-[9px]">Líder (Owner)</span>
                      <span className="text-primary font-bold">{form.owner}</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Ações Inferiores (Voltar / Avançar) */}
            <div className="flex items-center justify-between border-t border-border pt-4 mt-6 select-none">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="inline-flex items-center gap-1.5 border border-border bg-background hover:bg-muted text-foreground px-5 h-10 rounded-full text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Voltar
              </button>

              <button
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 bg-accent text-white hover:bg-accent-hover px-5 h-10 rounded-full text-xs font-semibold shadow-md shadow-accent/25 cursor-pointer"
              >
                {currentStep === 10 ? "Publicar Processo" : "Avançar"}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      )}
      
    </div>
  );
}
