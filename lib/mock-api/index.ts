import {
  aiOperationalInsights,
  customerHealthData,
  enterpriseBottlenecks,
  enterpriseKpis,
  enterpriseProcesses,
  organizationData,
  transformationRoadmap,
  type EnterpriseProcess,
} from "@/lib/enterprise-operational-data";
import { executiveKPIs } from "@/lib/dashboard-data";
import { presentationSlides } from "@/lib/presentation-data";

const NETWORK_DELAY_MS = 120;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), NETWORK_DELAY_MS);
  });
}

export const mockApi = {
  getExecutiveKpis: () => delay(executiveKPIs),
  getProcesses: () => delay(enterpriseProcesses),
  getProcessById: (id: string) =>
    delay(enterpriseProcesses.find((process) => process.id === id) ?? null),
  getBottlenecks: () => delay(enterpriseBottlenecks),
  getKpis: () => delay(enterpriseKpis),
  getRisks: () =>
    delay(
      enterpriseProcesses.flatMap((process) =>
        process.risks.map((risk, index) => ({
          id: `${process.id}-R${index + 1}`,
          processId: process.id,
          title: risk,
          department: process.department,
          severity: process.slaStatus === "CRITICAL" ? "CRITICAL" : "MEDIUM",
        }))
      )
    ),
  getCustomers: () => delay(customerHealthData),
  getOrganization: () => delay(organizationData),
  getRoadmap: () => delay(transformationRoadmap),
  getAiInsights: () => delay(aiOperationalInsights),
  getPresentationSlides: () => delay(presentationSlides),
};

export type { EnterpriseProcess };

export {
  aiOperationalInsights,
  customerHealthData,
  enterpriseBottlenecks,
  enterpriseKpis,
  enterpriseProcesses,
  organizationData,
  transformationRoadmap,
};
