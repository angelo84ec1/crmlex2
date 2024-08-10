<?php

namespace App\Services;

use Dompdf\Dompdf;
use Dompdf\Options;

class PdfService
{
    public function generateResumeProjectsPdf($projects)
    {
        // Initialize Dompdf
        $dompdf = new Dompdf();
        $options = new Options();
        $options->set('defaultFont', 'Arial');
        $dompdf->setOptions($options);

        // Load HTML content
        $html = view('pdf.resume_projects', ['projects' => $projects])->render();

        // Load HTML content into Dompdf
        $dompdf->loadHtml($html);

        // (Optional) Setup the paper size and orientation
        $dompdf->setPaper('A4', 'portrait');

        // Render the PDF
        $dompdf->render();

        // Return the generated PDF as a stream
        return $dompdf->output();
    }
}
