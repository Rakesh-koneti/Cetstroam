import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../lib/theme-context';
import { Exam } from '../lib/types';
import {
  Award,
  Clock,
  Target,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';

export function ExamResultPage() {
  const { examId } = useParams();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [exam, setExam] = useState<Exam | null>(null);
  const [results, setResults] = useState<{
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    score: number;
    percentage: number;
    timeTaken: number;
    isPassed: boolean;
  } | null>(null);

  useEffect(() => {
    // Load exam and results from localStorage
    const exams = JSON.parse(localStorage.getItem('exams') || '[]');
    const currentExam = exams.find((e: Exam) => e.id === examId);
    if (currentExam) {
      setExam(currentExam);
    }

    const examResults = JSON.parse(localStorage.getItem(`examResult_${examId}`) || 'null');
    if (examResults) {
      setResults(examResults);
    }
  }, [examId]);

  if (!exam || !results) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className={isDark ? 'text-white' : 'text-gray-900'}>Loading results...</p>
      </div>
    );
  }

  // Calculate pie chart segments
  const correctPercentage = (results.correctAnswers / results.totalQuestions) * 100;
  const wrongPercentage = (results.wrongAnswers / results.totalQuestions) * 100;
  const skippedPercentage = 100 - correctPercentage - wrongPercentage;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/exams"
        className={`inline-flex items-center gap-2 mb-8 text-sm font-medium ${
          isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Tests
      </Link>

      <div className={`rounded-lg p-6 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      } shadow-lg ring-1 ${
        isDark ? 'ring-gray-700' : 'ring-gray-200'
      }`}>
        <div className="text-center">
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {exam.title} - Results
          </h1>
          <div className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {new Date(exam.scheduledDate).toLocaleDateString()}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className={`p-6 rounded-lg ${
            isDark ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Score Overview
              </h2>
              <Award className={`h-6 w-6 ${results.isPassed ? 'text-green-500' : 'text-red-500'}`} />
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Total Score</span>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {results.score}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Percentage</span>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {results.percentage.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Time Taken</span>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {Math.floor(results.timeTaken / 60)}m {results.timeTaken % 60}s
                </span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Status</span>
                <span className={`font-semibold ${
                  results.isPassed ? 'text-green-500' : 'text-red-500'
                }`}>
                  {results.isPassed ? 'Passed' : 'Failed'}
                </span>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className={`p-6 rounded-lg ${
            isDark ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Performance Analysis
            </h2>
            <div className="mt-4 relative">
              <svg className="w-full h-48" viewBox="0 0 100 100">
                {/* Pie Chart Segments */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#22c55e"
                  strokeWidth="20"
                  strokeDasharray={`${correctPercentage} ${100 - correctPercentage}`}
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#ef4444"
                  strokeWidth="20"
                  strokeDasharray={`${wrongPercentage} ${100 - wrongPercentage}`}
                  transform={`rotate(${(correctPercentage - 90)} 50 50)`}
                />
                {skippedPercentage > 0 && (
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#f59e0b"
                    strokeWidth="20"
                    strokeDasharray={`${skippedPercentage} ${100 - skippedPercentage}`}
                    transform={`rotate(${(correctPercentage + wrongPercentage - 90)} 50 50)`}
                  />
                )}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {results.percentage.toFixed(0)}%
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Score
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {results.correctAnswers} Correct
                </span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {results.wrongAnswers} Wrong
                </span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {results.totalQuestions - results.correctAnswers - results.wrongAnswers} Skipped
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to={`/exam/${examId}/review`}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
              isDark
                ? 'bg-violet-600 text-white hover:bg-violet-500'
                : 'bg-violet-600 text-white hover:bg-violet-700'
            }`}
          >
            Review Answers
          </Link>
          <Link
            to="/exams"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
              isDark
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            Try Another Test
          </Link>
        </div>
      </div>
    </div>
  );
} 