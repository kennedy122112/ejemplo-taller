/**
 * Árbol maestro de procesos + utilidad de búsqueda de ruta.
 * Vive en shared/utils/ (no en layout/) porque lo consumen tanto piezas
 * del shell (layout/process-menu-tree, layout/create-document) como
 * utilidades transversales de shared (breadcrumbs.util) — shared no debe
 * depender de layout, así que la fuente de verdad va acá.
 */
export interface ProcessMenuNode {
  id: string;
  label: string;
  selected?: boolean;
  // Solo debe marcarse en nodos raiz: la vista inicial muestra hasta el segundo nivel.
  expanded?: boolean;
  // Ruta de la página principal del módulo (documentos y registros)
  moduleRoute?: string;
  // Si un nodo tiene estas propiedades, Crear documento puede completar documento/tipo y navegar.
  createRoute?: string;
  documentOptions?: string[];
  documentCreateOptions?: Array<{
    label: string;
    route?: string;
    actionTypes?: string[];
  }>;
  actionTypeOptions?: string[];
  /**
   * Marca un nodo como módulo planificado pero aún no implementado.
   * El menú lo renderiza con texto atenuado y badge "Próximamente",
   * y el click no navega (solo expande si tiene hijos).
   */
  comingSoon?: boolean;
  children?: ProcessMenuNode[];
}

/**
 * Árbol de procesos del taller, calcado del nodo de Figma «Gestión contabilidad»
 * (Proceso-Cierre-Contable, node-id 4597-18050). Todas las hojas son ejemplos de cómo se ve un
 * proceso planificado («Próximamente»): ninguna tiene backend simulado ni pantallas. Para sumar
 * un proceso real: una hoja con `moduleRoute` (Documentos y registros) y otra para sus consultas,
 * y sus rutas en `app.routes.ts`.
 */
export const DEFAULT_PROCESS_TREE: ProcessMenuNode[] = [
  {
    id: 'gestion-contabilidad',
    label: 'Gestión contabilidad',
    expanded: true,
    selected: true,
    comingSoon: true,
    children: [
      { id: 'catalogos-clasificadores', label: 'Catálogos y clasificadores', comingSoon: true },
      { id: 'integracion-siaf-rp-siaf-sp', label: 'Integración SIAF RP - SIAF SP', comingSoon: true },
      { id: 'contabilizacion-automatica', label: 'Contabilización automática', comingSoon: true },
      { id: 'apertura-contable', label: 'Apertura contable', comingSoon: true },
      {
        id: 'cierre-contable',
        label: 'Cierre contable',
        expanded: true,
        comingSoon: true,
        children: [
          {
            id: 'cierre-contable-documentos-validador-mensual',
            label: 'Documentos y registros de validador de datos cierre contable mensual de prueba',
            moduleRoute: '/procesos/validador-cierre-mensual',
          },
          {
            id: 'cierre-contable-documentos-anual',
            label: 'Documentos y registros del proceso de cierre contable anual',
            comingSoon: true,
          },
          {
            id: 'cierre-contable-validador-mensual',
            label: 'Validador de datos cierre contable mensual de prueba',
            comingSoon: true,
          },
          {
            id: 'cierre-contable-consultas-anual',
            label: 'Consultas y reportes del proceso de cierre contable anual',
            comingSoon: true,
          },
        ],
      },
    ],
  },
];

export function findProcessPathById(id: string, nodes: readonly ProcessMenuNode[] = DEFAULT_PROCESS_TREE): ProcessMenuNode[] {
  for (const node of nodes) {
    if (node.id === id) {
      return [node];
    }

    const childPath = findProcessPathById(id, node.children || []);

    if (childPath.length > 0) {
      return [node, ...childPath];
    }
  }

  return [];
}

/**
 * Árbol del menú "Ajustes" (módulo de administración). Lo pinta el mismo `siaf-process-menu-tree`
 * que el menú de procesos, con otros textos. En el taller no hay módulo de administración: las hojas
 * van como «Próximamente» y no navegan.
 */
export const ADMIN_MENU_TREE: ProcessMenuNode[] = [
  {
    id: 'administracion',
    label: 'Administración',
    expanded: true,
    children: [
      {
        id: 'usuarios-accesos',
        label: 'Usuarios y accesos',
        expanded: true,
        children: [
          { id: 'gestion-usuarios', label: 'Gestión de usuarios', comingSoon: true },
          { id: 'perfiles-funcionales', label: 'Perfiles funcionales', comingSoon: true },
        ],
      },
      {
        id: 'organizacion',
        label: 'Organización',
        children: [
          { id: 'entidades', label: 'Entidades', comingSoon: true },
          { id: 'unidades', label: 'Unidades orgánicas', comingSoon: true },
        ],
      },
    ],
  },
];
