'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownToLine, Download, Eye, File, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export function Resume() {
  // Resume details - Updated for Ayush Tiwari PPP Portfolio
  const resumeDetails = {
    title: "Ayush Tiwari - Product Manager Resume",
    description: 'Product Manager | 0→1 Product Strategy Expert | 3+ YOE across FinTech, EdTech & B2B',
    fileType: 'PDF',
    lastUpdated: 'August 2025',
    fileSize: '110 KB',
    previewImageSrc: '/ayush_resume_preview.png', // You can add this image later
    downloadUrl: '/Ayush_Tiwari_Resume.pdf', // Make sure to copy your PDF to /public/resume.pdf
  };

  const handleDownload = () => {
    // For external URLs, open in a new tab
    window.open(resumeDetails.downloadUrl, '_blank');
  };

  return (
    <div className="mx-auto w-full py-8 font-sans">
      {/* Resume Card */}
      <motion.div
        className="group relative overflow-hidden rounded-xl bg-accent p-0 transition-all duration-300 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.0, ease: 'easeOut' }}
      >
        {/* Details area */}
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-foreground">
                {resumeDetails.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {resumeDetails.description}
              </p>
              <div className="mt-1 flex text-xs text-muted-foreground">
                <span>{resumeDetails.fileType}</span>
                <span className="mx-2">•</span>
                <span>Updated {resumeDetails.lastUpdated}</span>
                <span className="mx-2">•</span>
                <span>{resumeDetails.fileSize}</span>
              </div>
            </div>
            {/* Download button */}
            <motion.button
              onClick={handleDownload}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white hover:bg-black/80 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Download PDF"
            >
              <Download className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* PDF Preview - Mobile Responsive */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="w-full rounded-xl overflow-hidden border bg-white shadow-lg"
      >
        <div className="bg-gray-100 px-4 py-2 flex items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <File className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Resume Preview</span>
          </div>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            <span className="hidden sm:inline">Open Full</span>
            <span className="sm:hidden">Open</span>
          </button>
        </div>
        
        {/* Mobile-First Responsive Container */}
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-gray-50 relative">
          {/* Mobile Alternative - Direct Link */}
          <div className="block sm:hidden absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <File className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Resume Preview</h3>
            <p className="text-sm text-gray-500 mb-6">
              PDF preview not available on mobile. Tap below to view or download.
            </p>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              View Resume
            </button>
          </div>

          {/* Desktop PDF Iframe */}
          <div className="hidden sm:block w-full h-full">
            <iframe
              src={resumeDetails.downloadUrl}
              width="100%"
              height="100%"
              className="border-0"
              title="Resume Preview"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Resume;
