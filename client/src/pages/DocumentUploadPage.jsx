import React, { useState, useRef } from 'react';
import { uploadDocument } from '../services/api';

const DocumentUploadPage = () => {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setResult(null); // Clear previous results
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
            setResult(null);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsLoading(true);
        const formData = new FormData();
        formData.append('document', file);

        try {
            const data = await uploadDocument(formData);
            setResult(data);
        } catch (error) {
            console.error("Document upload failed:", error);
            alert("Failed to process document. Make sure it's a valid PDF or Image.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Document Upload</h2>
                <p className="text-slate-500 mt-2 text-lg">
                    Upload legal PDFs or images. Our system extracts text and provides a concise summary.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upload Section */}
                <div 
                    className={`bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center justify-center min-h-[400px] border-dashed border-2 transition-colors ${
                        file ? 'border-blue-400 bg-blue-50/30' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
                    }`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => !file && fileInputRef.current?.click()}
                >
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        className="hidden" 
                        accept=".pdf,image/*"
                    />

                    {!file ? (
                        <>
                            <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-700 mb-2">Drag & Drop your files here</h3>
                            <p className="text-slate-500 mb-6 text-center">Support for PDF, JPG, PNG files.<br/>Click or drag to select.</p>
                            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-sm shadow-blue-200">
                                Browse Files
                            </button>
                        </>
                    ) : (
                        <div className="text-center w-full">
                            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-700 mb-2 truncate px-4">{file.name}</h3>
                            <p className="text-slate-500 mb-8">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            
                            <div className="flex gap-4 justify-center">
                                <button 
                                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors"
                                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                                <button 
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-sm flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    onClick={(e) => { e.stopPropagation(); handleUpload(); }}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </>
                                    ) : 'Process Document'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col h-[400px]">
                    <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-4">Extraction Results</h3>
                    
                    <div className="flex-1 overflow-y-auto">
                        {!result && !isLoading && (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400">
                                <svg className="w-16 h-16 mb-4 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                <p>Upload a document to see the summary here.</p>
                            </div>
                        )}

                        {isLoading && (
                            <div className="h-full flex flex-col items-center justify-center text-blue-500">
                                <svg className="animate-spin w-10 h-10 mb-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <p className="animate-pulse font-medium">Extracting and analyzing text...</p>
                            </div>
                        )}

                        {result && (
                            <div className="space-y-6 animate-in fade-in duration-500">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                        AI Summary
                                    </h4>
                                    <div className="bg-purple-50 text-purple-900 p-4 rounded-xl border border-purple-100 text-sm leading-relaxed">
                                        {result.summary || "No summary available."}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                                        Extracted Text Snippet
                                    </h4>
                                    <div className="bg-slate-50 text-slate-600 p-4 rounded-xl border border-slate-200 text-xs font-mono h-32 overflow-y-auto">
                                        {result.extractedText || "No text extracted."}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentUploadPage;
