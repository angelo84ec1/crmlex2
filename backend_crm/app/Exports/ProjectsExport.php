<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Font;

class ProjectsExport implements FromCollection, WithHeadings, WithMapping, WithStyles
{
    protected $projects;
    protected $data = [];
    protected $counter = 1;

    public function __construct(Collection $projects)
    {
        $this->projects = $projects;
        $this->prepareData();
    }

    public function collection()
    {
        return collect($this->data);
    }

    public function headings(): array
    {
        return [
            'Project Name',
            'Assigned To',
            'Start Date',
            'End Date',
            'Progress',
            'Status',
        ];
    }

    public function map($row): array
    {
        return [
            $row['project_name'],
            $row['assignUser'],
            $row['start_date'],
            $row['end_date'],
            $row['progress'],
            $row['status'],
        ];
    }

    private function prepareData()
    {
        foreach ($this->projects as $project) {
            $assignedProjectUsers = $project->assignUser
                ? $project->assignUser->map(fn($assignUser) => $assignUser->assinBy->name)->implode(', ')
                : '';

            $this->data[] = [
                'project_name' => $project->project_name,
                'assignUser' => $assignedProjectUsers,
                'start_date' => $project->project_startdate,
                'end_date' => $project->project_enddate,
                'progress' => $project->progress . '%',
                'status' => $project->project_status,
            ];

            foreach ($project->tasks as $task) {
                $assignedTaskUsers = $task->taskName->assignUser
                    ? $task->taskName->assignUser->map(fn($taskAssignUser) => $taskAssignUser->assinBy->name)->implode(', ')
                    : '';

                $this->data[] = [
                    'project_name' => '— ' . $task->taskName->title,
                    'assignUser' => $assignedTaskUsers,
                    'start_date' => $task->taskName->start_date,
                    'end_date' => $task->taskName->end_date,
                    'progress' => $task->taskName->progress . '%',
                    'status' => $task->taskName->status,
                ];

                foreach ($task->subTasks as $subTask) {
                    $assignedSubTaskUsers = $subTask->subTaskName->assignUser
                        ? $subTask->subTaskName->assignUser->map(fn($subTaskAssignUser) => $subTaskAssignUser->assinBy->name)->implode(', ')
                        : '';

                    $this->data[] = [
                        'project_name' => '— — ' . $subTask->subTaskName->title,
                        'assignUser' => $assignedSubTaskUsers,
                        'start_date' => $subTask->subTaskName->start_date,
                        'end_date' => $subTask->subTaskName->end_date,
                        'progress' => $subTask->subTaskName->progress . '%',
                        'status' => $subTask->subTaskName->status,
                    ];
                }
            }
        }
    }

    public function styles(Worksheet $sheet)
    {
        $headerRow = 1;
        $currentRow = 2;
        $styles = [
            // Header styles
            $headerRow => [
                'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF'], 'size' => 12 ],
                'fill' => ['fillType' => Fill::FILL_GRADIENT_LINEAR, 'startColor' => ['rgb' => '4A00E0'], 'endColor' => ['rgb' => '8E2DE2']],
                'alignment' => ['horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER],
            ]
        ];

        foreach ($this->data as $row) {
            if (str_starts_with($row['project_name'], '— — ')) {
                // $styles[$currentRow] = [
                //     'font' => ['color' => ['rgb' => '000000']],
                //     'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => 'FFFFFF']],
                // ];
            } elseif (str_starts_with($row['project_name'], '— ')) {
                $styles[$currentRow] = [
                    'font' => ['color' => ['rgb' => 'FFFFFF']],
                    'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => '76933C']],
                ];
            } else {
                $styles[$currentRow] = [
                    'font' => ['color' => ['rgb' => 'FFFFFF']],
                    'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => '008000']],
                ];
            }
            $currentRow++;
        }

        // Set default column widths
        $sheet->getColumnDimension('A')->setWidth(70);  // Set column A width
        $sheet->getColumnDimension('B')->setWidth(70);  // Set column B width
        $sheet->getColumnDimension('C')->setWidth(25);  // Set column C width
        $sheet->getColumnDimension('D')->setWidth(25);  // Set column D width
        $sheet->getColumnDimension('E')->setWidth(10);  // Set column E width
        $sheet->getColumnDimension('F')->setWidth(15);  // Set column F width

        return $styles;
    }
}
