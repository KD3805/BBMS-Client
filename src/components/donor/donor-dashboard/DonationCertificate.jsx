import React, { useState, useEffect } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

async function generateCertificatePDF(donorName, donationDate) {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const templateUrl = 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1739078851/Blood_Donation_Certificate_01_im8a7y.png';
  const templateBytes = await fetch(templateUrl).then(res => res.arrayBuffer());
  const templateImage = await pdfDoc.embedPng(templateBytes);

  const fontUrl = 'https://res.cloudinary.com/deq0hxr3t/raw/upload/v1738947500/Notable-Regular_tskkqm.ttf';
  const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer());
  const customFont = await pdfDoc.embedFont(fontBytes, { subset: true });
  const builtInFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const page = pdfDoc.addPage([842, 595]);
  page.drawImage(templateImage, {
    x: 0,
    y: 0,
    width: page.getWidth(),
    height: page.getHeight(),
  });

  const donorFontSize = 37;
  const donorTextWidth = customFont.widthOfTextAtSize(donorName, donorFontSize);
  const donorX = (page.getWidth() - donorTextWidth) / 2;
  const donorY = page.getHeight() / 2;
  page.drawText(donorName, {
    x: donorX,
    y: donorY,
    size: donorFontSize,
    font: customFont,
    color: rgb(1, 0.1, 0.1),
  });

  const dateFontSize = 17;
  const dateTextWidth = customFont.widthOfTextAtSize(donationDate, dateFontSize);
  const dateX = (page.getWidth() - dateTextWidth) / 2 + 12;
  const dateY = donorY - 88;
  page.drawText(donationDate, {
    x: dateX,
    y: dateY,
    size: dateFontSize,
    font: builtInFont,
    color: rgb(0, 0, 0),
  });

  return await pdfDoc.save();
}

const DonationCertificate = () => {
  const [donationRecords, setDonationRecords] = useState([]);

  useEffect(() => {
    setDonationRecords([
      { id: 1, donorName: 'John Doe', donationDate: '2025-01-15' },
      { id: 2, donorName: 'John Doe', donationDate: '2025-02-10' },
    ]);
  }, []);

  const handleGenerateCertificate = async (record) => {
    try {
      const pdfBytes = await generateCertificatePDF(record.donorName, record.donationDate);
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank'); // Opens the PDF in a new tab
    } catch (error) {
      console.error('Error generating certificate:', error);
    }
  };

  return (
    <div>
      <h2>Donation Certificates</h2>
      <div>
        <h3>Your Donations</h3>
        <ul>
          {donationRecords.map((record) => (
            <li key={record.id}>
              Donation on {record.donationDate}{' '}
              <button onClick={() => handleGenerateCertificate(record)}>
                View Certificate
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DonationCertificate;
