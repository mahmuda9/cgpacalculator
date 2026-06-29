'use client';

import React, { useState, useMemo } from 'react';

const GRADE_SCALE = [
  { grade: 'A', gpa: 4.00, marks: '90 - 100', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
  { grade: 'A-', gpa: 3.67, marks: '86 - 89', color: 'bg-teal-500/10 text-teal-400 border-teal-500/30' },
  { grade: 'B+', gpa: 3.33, marks: '82 - 85', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' },
  { grade: 'B', gpa: 3.00, marks: '78 - 81', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
  { grade: 'B-', gpa: 2.67, marks: '74 - 77', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' },
  { grade: 'C+', gpa: 2.33, marks: '70 - 73', color: 'bg-violet-500/10 text-violet-400 border-violet-500/30' },
  { grade: 'C', gpa: 2.00, marks: '66 - 69', color: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
  { grade: 'C-', gpa: 1.67, marks: '65 - 68', color: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30' },
  { grade: 'D+', gpa: 1.33, marks: '61 - 64', color: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
  { grade: 'D', gpa: 1.00, marks: '57 - 60', color: 'bg-orange-500/10 text-orange-400 border-orange-500/30' },
  { grade: 'F', gpa: 0.00, marks: '< 57', color: 'bg-rose-500/10 text-rose-400 border-rose-500/30' },
];

export default function CGPACalculator() {
  const [courses, setCourses] = useState([
    { id: 1, name: 'Course 1', credit: 3, grade: 'A' },
    { id: 2, name: 'Course 2', credit: 3, grade: 'A-' },
    { id: 3, name: 'Course 3', credit: 4, grade: 'B+' },
    { id: 4, name: 'Course 4', credit: 3, grade: 'B' },
  ]);

  const [showGradeScale, setShowGradeScale] = useState(false);

  const addCourse = () => {
    const newId = courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1;
    setCourses([...courses, { id: newId, name: `Course ${newId}`, credit: 3, grade: 'A' }]);
  };

  const removeCourse = (id) => {
    if (courses.length === 1) {
      alert('You must keep at least one course field.');
      return;
    }
    setCourses(courses.filter((c) => c.id !== id));
  };

  const updateCourse = (id, field, value) => {
    setCourses(
      courses.map((c) => {
        if (c.id === id) {
          return { ...c, [field]: value };
        }
        return c;
      })
    );
  };

  const resetAll = () => {
    setCourses([
      { id: 1, name: 'Course 1', credit: 3, grade: 'A' },
      { id: 2, name: 'Course 2', credit: 3, grade: 'A' },
    ]);
  };

  const { totalCgpa, totalCredits, totalGradePoints, performanceText, performanceColor } = useMemo(() => {
    let totCredits = 0;
    let totPoints = 0;

    courses.forEach((course) => {
      const cred = parseFloat(course.credit) || 0;
      const gradeObj = GRADE_SCALE.find((g) => g.grade === course.grade);
      const point = gradeObj ? gradeObj.gpa : 0;
      totCredits += cred;
      totPoints += cred * point;
    });

    const cgpa = totCredits > 0 ? (totPoints / totCredits).toFixed(2) : '0.00';
    const cgpaNum = parseFloat(cgpa);

    let perf = 'N/A';
    let color = 'text-slate-400';

    if (totCredits > 0) {
      if (cgpaNum >= 3.75) {
        perf = 'High Distinction 🏆';
        color = 'text-emerald-400';
      } else if (cgpaNum >= 3.5) {
        perf = 'Distinction ⭐';
        color = 'text-teal-400';
      } else if (cgpaNum >= 3.0) {
        perf = 'First Class 👍';
        color = 'text-blue-400';
      } else if (cgpaNum >= 2.5) {
        perf = 'Second Class Upper 👌';
        color = 'text-indigo-400';
      } else if (cgpaNum >= 2.0) {
        perf = 'Satisfactory Pass ✔️';
        color = 'text-amber-400';
      } else {
        perf = 'Needs Improvement ⚠️';
        color = 'text-rose-400';
      }
    }

    return {
      totalCgpa: cgpa,
      totalCredits: totCredits.toFixed(1),
      totalGradePoints: totPoints.toFixed(2),
      performanceText: perf,
      performanceColor: color,
    };
  }, [courses]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Section */}
        <header className="text-center space-y-3 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            Academic Performance Calculator
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
            CGPA Calculator
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Select course credits and grades to accurately compute your cumulative grade point average instantly.
          </p>
        </header>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Input Form (Spans 2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Courses & Grades
                  </h2>
                  <p className="text-xs text-slate-400">Specify credit hours and letter grade for each subject</p>
                </div>
                <button
                  onClick={() => setShowGradeScale(!showGradeScale)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 underline font-medium cursor-pointer"
                >
                  {showGradeScale ? 'Hide Grading Scale' : 'View Grading Scale'}
                </button>
              </div>

              {/* Grading Scale Reference Table (Expandable) */}
              {showGradeScale && (
                <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 text-xs space-y-3 animate-fadeIn">
                  <h3 className="font-semibold text-slate-300 border-b border-slate-800 pb-2">Grading System Reference</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {GRADE_SCALE.map((item) => (
                      <div key={item.grade} className={`p-2 rounded-lg border ${item.color} flex flex-col justify-between`}>
                        <div className="flex justify-between items-center font-bold">
                          <span>Grade {item.grade}</span>
                          <span>{item.gpa.toFixed(2)}</span>
                        </div>
                        <div className="text-[10px] opacity-80 mt-1">Marks: {item.marks}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Course Inputs List */}
              <div className="space-y-3">
                {courses.map((course, index) => (
                  <div
                    key={course.id}
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 bg-slate-950/40 rounded-xl border border-slate-800/60 hover:border-slate-700 transition-all"
                  >
                    <span className="text-xs font-bold text-slate-500 w-6 text-center hidden sm:block">
                      #{index + 1}
                    </span>

                    {/* Course Title Input */}
                    <div className="flex-1">
                      <input
                        type="text"
                        value={course.name}
                        onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                        placeholder="Course Title (e.g. Math 101)"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    {/* 1st Required Input: Credit */}
                    <div className="w-full sm:w-32">
                      <label className="block text-[10px] text-slate-400 mb-1 sm:hidden">Select Credit</label>
                      <select
                        value={course.credit}
                        onChange={(e) => updateCourse(course.id, 'credit', parseFloat(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                      >
                        <option value={1}>1.0 Credit</option>
                        <option value={1.5}>1.5 Credits</option>
                        <option value={2}>2.0 Credits</option>
                        <option value={3}>3.0 Credits</option>
                        <option value={4}>4.0 Credits</option>
                        <option value={5}>5.0 Credits</option>
                      </select>
                    </div>

                    {/* 2nd Required Input: Grade */}
                    <div className="w-full sm:w-36">
                      <label className="block text-[10px] text-slate-400 mb-1 sm:hidden">Select Grade</label>
                      <select
                        value={course.grade}
                        onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-semibold text-indigo-300 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                      >
                        {GRADE_SCALE.map((g) => (
                          <option key={g.grade} value={g.grade}>
                            {g.grade} ({g.gpa.toFixed(2)}) - {g.marks}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Delete Row Button */}
                    <button
                      onClick={() => removeCourse(course.id)}
                      className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors self-end sm:self-center"
                      title="Remove Course"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={addCourse}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Another Course
                </button>

                <button
                  onClick={resetAll}
                  className="text-slate-400 hover:text-slate-200 text-sm font-medium px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  Reset Calculator
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Results Summary Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 sticky top-6">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-lg font-bold text-white">CGPA Result Summary</h2>
                <p className="text-xs text-slate-400">Calculated based on selected credits and grade points</p>
              </div>

              {/* Large CGPA Circular/Badge Display */}
              <div className="flex flex-col items-center justify-center py-4 bg-slate-950/60 rounded-xl border border-slate-800/80 relative overflow-hidden">
                <div className="absolute inset-0 bg-indigo-500/5 blur-xl"></div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Total CGPA</span>
                <span className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
                  {totalCgpa}
                </span>
                <span className="text-xs text-slate-500 mt-1">Out of 4.00 Max Scale</span>
              </div>

              {/* Details Metrics */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Total Credits Earned</span>
                  <span className="font-semibold text-slate-200">{totalCredits}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Total Quality Points</span>
                  <span className="font-semibold text-slate-200">{totalGradePoints}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-400">Academic Status</span>
                  <span className={`font-bold ${performanceColor}`}>{performanceText}</span>
                </div>
              </div>

              {/* Grading Scheme Guide Summary */}
              <div className="p-4 bg-indigo-950/30 rounded-xl border border-indigo-900/40 text-xs space-y-2 text-indigo-200/90">
                <div className="font-semibold text-indigo-300 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  System Formula
                </div>
                <p className="leading-relaxed text-slate-400">
                  <strong className="text-slate-300">CGPA</strong> = ∑ (Course Credit × Grade Point) ÷ Total Credits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
