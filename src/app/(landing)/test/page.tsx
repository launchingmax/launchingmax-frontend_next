// app/page.tsx
export default function Home() {
  return (
    <div className="h-screen overflow-y-scroll scroll-smooth  scroll-cubic ">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full bg-white p-4 z-10 flex space-x-4">
        <a href="#section1" className="px-3 py-2 bg-blue-500 text-white rounded-md">
          Section 1
        </a>
        <a href="#section2" className="px-3 py-2 bg-blue-500 text-white rounded-md">
          Section 2
        </a>
        <a href="#section3" className="px-3 py-2 bg-blue-500 text-white rounded-md">
          Section 3
        </a>
      </nav>

      {/* Sections */}
      <main className="pt-20">
        <section
          id="section1"
          className="h-screen flex items-center justify-center bg-gray-700 text-white text-4xl font-bold"
        >
          Section 1
        </section>
        <section
          id="section2"
          className="h-screen flex items-center justify-center bg-green-500 text-white text-4xl font-bold"
        >
          Section 2
        </section>
        <section
          id="section3"
          className="h-screen flex items-center justify-center bg-red-500 text-white text-4xl font-bold"
        >
          Section 3
        </section>
      </main>
    </div>
  );
}
