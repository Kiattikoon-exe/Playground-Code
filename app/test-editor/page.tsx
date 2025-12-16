'use client';
import { useState } from 'react';
import CodeEditor from '@/components/CodeEditor';
import WebEditor from '@/components/WebEditor';
import ResultModal from '@/components/ResultModal';
import Header from '@/components/ui/Header';
import LanguageDropdown from '@/components/ui/LanguageDropdown';
import ReadOnlyWarningModal from '@/components/ui/ReadOnlyWarningModal';
import ProgressBar from '@/components/ui/ProgressBar';
import ChallengePanel from '@/components/editor/ChallengePanel';
import ResultPanel from '@/components/editor/ResultPanel';
import { useChallenges } from '@/hooks/useChallenges';
import { useSubmission } from '@/hooks/useSubmission';

export default function TestEditorPage() {
  const [showReadOnlyWarning, setShowReadOnlyWarning] = useState(false);

  // Use custom hooks
  const {
    challengeData,
    challengeId,
    currentChallengeIndex,
    totalChallenges,
    isLoading,
    language,
    code,
    setCode,
    protectedRanges,
    htmlCode,
    setHtmlCode,
    cssCode,
    setCssCode,
    jsCode,
    setJsCode,
    handleNext,
    handleBack,
    handleLanguageChange,
    handleReboot,
  } = useChallenges();

  const {
    response,
    isSubmitting,
    showModal,
    handleSubmit,
    closeModal,
    resetResponse,
  } = useSubmission();

  const onSubmit = () => {
    handleSubmit(
      challengeId,
      language,
      code,
      challengeData,
      htmlCode,
      cssCode,
      jsCode
    );
  };

  const onNext = () => {
    closeModal();
    resetResponse();
    handleNext();
  };

  const onBack = () => {
    closeModal();
    resetResponse();
    handleBack();
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Modals */}
      <ResultModal
        isOpen={showModal}
        onClose={closeModal}
        isCorrect={response?.isCorrect || false}
        message={response?.message}
        onNext={onNext}
      />

      <ReadOnlyWarningModal
        isOpen={showReadOnlyWarning}
        onClose={() => setShowReadOnlyWarning(false)}
      />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-4 px-4 py-4" style={{ height: 'calc(100vh - 73px - 52px)' }}>
        {/* Left Panel - Challenge Info */}
        <ChallengePanel
          challengeData={challengeData}
          isLoading={isLoading}
        />

        {/* Middle Panel - Code Editor */}
        <div className="col-span-5 bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm flex flex-col relative z-20">
          <div className="bg-gradient-to-b from-teal-900 to-teal-500 text-white px-6 py-2 flex items-center justify-center rounded-t-xl relative z-10">
            <LanguageDropdown
              value={language}
              onChange={handleLanguageChange}
            />
          </div>

          {language === 'web' ? (
            <WebEditor
              onCodeChange={({ htmlCode: h, cssCode: c, jsCode: j }: { htmlCode: string, cssCode: string, jsCode: string }) => {
                setHtmlCode(h);
                setCssCode(c);
                setJsCode(j);
              }}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
              initialHtml={htmlCode}
              initialCss={cssCode}
              initialJs={jsCode}
            />
          ) : (
            <>
              <div className="flex-1 overflow-hidden relative bg-gray-900">
                <div className="absolute inset-0">
                  <CodeEditor
                    key={challengeId}
                    defaultCode={code}
                    language={language}
                    onCodeChange={setCode}
                    height="100%"
                    protectedRanges={protectedRanges}
                    onReadOnlyWarning={() => setShowReadOnlyWarning(true)}
                    errors={response?.syntaxErrors?.map((msg: string | { line: number; message: string }, i: number) => ({
                      line: typeof msg === 'string' ? i + 1 : msg.line,
                      message: typeof msg === 'string' ? msg : msg.message
                    })) || []}
                  />
                </div>
              </div>
              <div className="border-t border-gray-200 p-4 flex gap-3 justify-end bg-white">
                <button
                  onClick={handleReboot}
                  className="px-10 py-2.5 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors shadow-sm"
                >
                  REBOOT
                </button>
                <button
                  onClick={onNext}
                  disabled={currentChallengeIndex >= totalChallenges - 1}
                  className="px-10 py-2.5 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  SKIP →
                </button>
                <button
                  onClick={onSubmit}
                  disabled={isSubmitting}
                  className="px-10 py-2.5 bg-gradient-to-b from-teal-900 to-teal-500 text-white rounded-lg font-semibold hover:from-teal-800 hover:to-teal-400 disabled:from-gray-400 disabled:to-gray-400 transition-all shadow-md"
                >
                  {isSubmitting ? 'กำลังตรวจสอบ...' : 'SUBMIT'}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right Panel - Results */}
        <ResultPanel response={response} />
      </div>

      {/* Bottom Progress Bar */}
      <ProgressBar
        currentIndex={currentChallengeIndex}
        total={totalChallenges}
        onBack={onBack}
        canGoBack={currentChallengeIndex > 0}
      />
    </div>
  );
}