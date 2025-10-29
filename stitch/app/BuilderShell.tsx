import SectionCatalog from '../components/SectionCatalog.client';
import Canvas from '../components/Canvas.client';
import Inspector from '../components/Inspector.client';
import Toolbar from '../components/Toolbar.client';

export default function BuilderShell() {
  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white">
      {/* Top Toolbar */}
      <Toolbar />

      {/* Main 3-column layout */}
      <div className="flex flex-1 overflow-hidden border-t border-slate-700">
        {/* Left: Section Catalog */}
        <aside className="w-64 border-r border-slate-700 overflow-y-auto">
          <SectionCatalog />
        </aside>

        {/* Center: Canvas */}
        <main className="flex-1 overflow-y-auto">
          <Canvas />
        </main>

        {/* Right: Inspector */}
        <aside className="w-72 border-l border-slate-700 overflow-y-auto">
          <Inspector />
        </aside>
      </div>
    </div>
  );
}