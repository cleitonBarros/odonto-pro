export const getPageName = (path: string): string => {
  const pageNames: Record<string, string> = {
    "/dashboard/services": "Serviços",
    "/dashboard/profile": "Perfil",
    "/dashboard": "Agendamento",
    "/dashboard/settings": "Configurações",
    "/dashboard/plans": "Planos",
    // Adicione mais rotas conforme necessário
  };

  return pageNames[path] || "Página";
};
