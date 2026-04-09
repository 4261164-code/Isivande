import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Search, Bell, FileWarning, FileCheck2, ClipboardCheck, Users, Send, Printer, Upload, AlertCircle, CheckCircle2, Clock3, ShieldCheck, Filter, ChevronRight, UserCircle2, FileText, Receipt, PenSquare, BadgeCheck, TriangleAlert, Calendar } from "lucide-react";

type Status = "ready" | "blocked" | "in_progress" | "pending" | "approved" | "rejected";
type IssueSeverity = "high" | "medium" | "low";

type Learner = {
  id: string;
  fullName: string;
  idNumber: string;
  programme: string;
  employer: string;
  status: Status;
  assignedTo: string;
  dueDate: string;
  issue: string;
  documents: { type: string; status: "approved" | "pending" | "rejected"; version: number; readable: boolean; reviewedBy?: string }[];
  compliance: {
    nameMatchesId: boolean;
    idReadable: boolean;
    ifDocumentReceived: boolean;
    demandListComplete: boolean;
    signatureReceived: boolean;
    invoiceValid: boolean;
    noOpenCorrections: boolean;
  };
  demandList: { item: string; quantity: number; cost: string; supplier: string; status: string }[];
  corrections: { field: string; oldValue: string; newValue: string; reason: string; status: string; date: string }[];
  signatures: { step: string; done: boolean; date?: string; by?: string }[];
  assessments: { module: string; status: string; assessor: string; moderator: string; result: string }[];
  timeline: { event: string; at: string; by: string }[];
};

const learners: Learner[] = [
  {
    id: "L-001",
    fullName: "Lerato Mokoena",
    idNumber: "9801120674083",
    programme: "Systems Development NQF 5",
    employer: "Isivande Projects",
    status: "blocked",
    assignedTo: "Mlu",
    dueDate: "2026-04-09",
    issue: "Signature required",
    documents: [
      { type: "ID Copy", status: "approved", version: 2, readable: true, reviewedBy: "Admin" },
      { type: "IF Document", status: "pending", version: 1, readable: true },
      { type: "Demand List", status: "approved", version: 1, readable: true, reviewedBy: "Manager" },
      { type: "Signature Page", status: "pending", version: 0, readable: false },
      { type: "Invoice", status: "pending", version: 1, readable: true },
    ],
    compliance: {
      nameMatchesId: true,
      idReadable: true,
      ifDocumentReceived: false,
      demandListComplete: true,
      signatureReceived: false,
      invoiceValid: false,
      noOpenCorrections: false,
    },
    demandList: [
      { item: "Laptop", quantity: 1, cost: "R8,500", supplier: "Tech Hub SA", status: "Awaiting Signature" },
      { item: "Data Bundle", quantity: 3, cost: "R1,200", supplier: "Telco Connect", status: "Awaiting Signature" },
    ],
    corrections: [
      { field: "Invoice Number", oldValue: "00", newValue: "INV-2026-014", reason: "Placeholder used by mistake", status: "Open", date: "2026-04-08" },
      { field: "IF Document", oldValue: "Missing", newValue: "Pending upload", reason: "Learner will send copy", status: "Open", date: "2026-04-08" },
    ],
    signatures: [
      { step: "Requested", done: true, date: "2026-04-08", by: "Mlu" },
      { step: "Printed", done: true, date: "2026-04-08", by: "Admin" },
      { step: "Signed", done: false },
      { step: "Uploaded", done: false },
      { step: "Verified", done: false },
    ],
    assessments: [
      { module: "Programming Foundations", status: "Moderated", assessor: "A. Dlamini", moderator: "T. Nkosi", result: "Competent" },
      { module: "Database Design", status: "Assessed", assessor: "A. Dlamini", moderator: "T. Nkosi", result: "Pending Moderation" },
    ],
    timeline: [
      { event: "Learner created", at: "2026-04-02 09:15", by: "Admin" },
      { event: "ID copy approved", at: "2026-04-05 11:42", by: "Reviewer" },
      { event: "Demand list generated", at: "2026-04-07 14:20", by: "Manager" },
      { event: "Signature pack printed", at: "2026-04-08 09:20", by: "Admin" },
    ],
  },
  {
    id: "L-002",
    fullName: "Thando Maseko",
    idNumber: "0103245489088",
    programme: "Technical Support A+ & N+",
    employer: "Greenbyte Skills",
    status: "ready",
    assignedTo: "Nomsa",
    dueDate: "2026-04-08",
    issue: "Ready for submission",
    documents: [
      { type: "ID Copy", status: "approved", version: 1, readable: true, reviewedBy: "Admin" },
      { type: "IF Document", status: "approved", version: 1, readable: true, reviewedBy: "Admin" },
      { type: "Demand List", status: "approved", version: 1, readable: true, reviewedBy: "Manager" },
      { type: "Signature Page", status: "approved", version: 1, readable: true, reviewedBy: "Manager" },
      { type: "Invoice", status: "approved", version: 1, readable: true, reviewedBy: "Finance" },
    ],
    compliance: {
      nameMatchesId: true,
      idReadable: true,
      ifDocumentReceived: true,
      demandListComplete: true,
      signatureReceived: true,
      invoiceValid: true,
      noOpenCorrections: true,
    },
    demandList: [{ item: "Toolkit", quantity: 1, cost: "R3,200", supplier: "IT Core", status: "Approved" }],
    corrections: [],
    signatures: [
      { step: "Requested", done: true, date: "2026-04-03", by: "Nomsa" },
      { step: "Printed", done: true, date: "2026-04-03", by: "Admin" },
      { step: "Signed", done: true, date: "2026-04-04", by: "Learner" },
      { step: "Uploaded", done: true, date: "2026-04-04", by: "Admin" },
      { step: "Verified", done: true, date: "2026-04-04", by: "Manager" },
    ],
    assessments: [
      { module: "Hardware Support", status: "Moderated", assessor: "K. Mbele", moderator: "R. Zwane", result: "Competent" },
      { module: "Network Basics", status: "Moderated", assessor: "K. Mbele", moderator: "R. Zwane", result: "Competent" },
    ],
    timeline: [
      { event: "Submission readiness approved", at: "2026-04-08 08:40", by: "System" },
      { event: "Certificate queued", at: "2026-04-08 08:45", by: "Manager" },
    ],
  },
  {
    id: "L-003",
    fullName: "Ayanda Max Khumalo",
    idNumber: "9605180090082",
    programme: "End-User Computing",
    employer: "Isivande Projects",
    status: "blocked",
    assignedTo: "Mlu",
    dueDate: "2026-04-10",
    issue: "Second name mismatch",
    documents: [
      { type: "ID Copy", status: "rejected", version: 1, readable: false, reviewedBy: "Admin" },
      { type: "Demand List", status: "pending", version: 1, readable: true },
    ],
    compliance: {
      nameMatchesId: false,
      idReadable: false,
      ifDocumentReceived: false,
      demandListComplete: false,
      signatureReceived: false,
      invoiceValid: false,
      noOpenCorrections: false,
    },
    demandList: [],
    corrections: [
      { field: "Second Name", oldValue: "Max", newValue: "", reason: "Not shown on ID copy", status: "Open", date: "2026-04-08" },
      { field: "ID Copy", oldValue: "Unreadable", newValue: "Awaiting replacement", reason: "Image quality too poor", status: "Open", date: "2026-04-08" },
    ],
    signatures: [
      { step: "Requested", done: false },
      { step: "Printed", done: false },
      { step: "Signed", done: false },
      { step: "Uploaded", done: false },
      { step: "Verified", done: false },
    ],
    assessments: [],
    timeline: [{ event: "ID rejected as unreadable", at: "2026-04-08 09:05", by: "Admin" }],
  },
];

const kpis = [
  { label: "Total Active Learners", value: 128, icon: Users },
  { label: "Ready for Submission", value: 34, icon: BadgeCheck },
  { label: "Awaiting Documents", value: 19, icon: FileWarning },
  { label: "Awaiting Signatures", value: 11, icon: PenSquare },
  { label: "Issues / Blocked", value: 23, icon: TriangleAlert },
  { label: "Submitted This Week", value: 17, icon: Send },
];

function statusBadge(status: string) {
  const map: Record<string, string> = {
    ready: "bg-emerald-100 text-emerald-700 border-emerald-200",
    blocked: "bg-rose-100 text-rose-700 border-rose-200",
    in_progress: "bg-amber-100 text-amber-700 border-amber-200",
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    rejected: "bg-rose-100 text-rose-700 border-rose-200",
    Open: "bg-rose-100 text-rose-700 border-rose-200",
    Closed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };
  return map[status] || "bg-slate-100 text-ink border-slate-200";
}

function IconRow({ icon: Icon, title, value, subtext }: { icon: any; title: string; value: string | number; subtext?: string }) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-ink">{title}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
            {subtext ? <p className="mt-1 text-xs text-ink">{subtext}</p> : null}
          </div>
          <div className="rounded-2xl border bg-slate-50 p-3">
            <Icon className="h-5 w-5 text-ink" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ComplianceCheck({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-xl border p-3">
      <div className="flex items-center gap-3">
        {ok ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <Badge variant="outline" className={ok ? statusBadge("approved") : statusBadge("rejected")}>
        {ok ? "Pass" : "Blocker"}
      </Badge>
    </div>
  );
}

function ComplianceSummary({ learner }: { learner: Learner }) {
  const checks = Object.values(learner.compliance);
  const complete = checks.filter(Boolean).length;
  const percent = Math.round((complete / checks.length) * 100);
  const blockedReasons = [
    !learner.compliance.nameMatchesId && "Name does not match ID",
    !learner.compliance.idReadable && "ID copy unreadable or not approved",
    !learner.compliance.ifDocumentReceived && "IF document missing",
    !learner.compliance.demandListComplete && "Demand list incomplete",
    !learner.compliance.signatureReceived && "Signature missing",
    !learner.compliance.invoiceValid && "Invoice number invalid",
    !learner.compliance.noOpenCorrections && "Open corrections still unresolved",
  ].filter(Boolean) as string[];

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Compliance Panel</CardTitle>
        <CardDescription>Rule-based submission readiness for this learner</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-2xl border p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-ink">Submission readiness</p>
              <div className="mt-2 flex items-center gap-3">
                <Badge variant="outline" className={blockedReasons.length === 0 ? statusBadge("ready") : statusBadge("blocked")}>
                  {blockedReasons.length === 0 ? "READY FOR SUBMISSION" : "BLOCKED"}
                </Badge>
                <span className="text-sm text-ink">{percent}% complete</span>
              </div>
            </div>
            <div className="w-40">
              <Progress value={percent} />
            </div>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <ComplianceCheck label="Name matches ID" ok={learner.compliance.nameMatchesId} />
          <ComplianceCheck label="ID copy readable" ok={learner.compliance.idReadable} />
          <ComplianceCheck label="IF document received" ok={learner.compliance.ifDocumentReceived} />
          <ComplianceCheck label="Demand list complete" ok={learner.compliance.demandListComplete} />
          <ComplianceCheck label="Signature received" ok={learner.compliance.signatureReceived} />
          <ComplianceCheck label="Invoice valid" ok={learner.compliance.invoiceValid} />
          <ComplianceCheck label="No open corrections" ok={learner.compliance.noOpenCorrections} />
        </div>

        {blockedReasons.length > 0 && (
          <Alert className="rounded-2xl">
            <TriangleAlert className="h-4 w-4" />
            <AlertTitle>Current blockers</AlertTitle>
            <AlertDescription>
              <ul className="mt-2 space-y-1 text-sm">
                {blockedReasons.map((reason) => (
                  <li key={reason}>• {reason}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

function DeadlineTracker() {
  const deadlines = [
    { id: 1, title: "Q2 Learner Submissions", date: "2026-04-15" },
    { id: 2, title: "SETA Audit Prep", date: "2026-04-20" }
  ];

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Administration Deadlines</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {deadlines.map(d => (
          <div key={d.id} className="flex items-center justify-between border-b pb-2">
            <div>
              <p className="font-medium text-ink">{d.title}</p>
              <p className="text-sm text-ink">{d.date}</p>
            </div>
            <Calendar className="h-4 w-4 text-neon" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function AdminDashboard({ onSelectLearner }: { onSelectLearner: (learner: Learner) => void }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    return learners.filter((learner) => {
      const matchesQuery = [learner.fullName, learner.idNumber, learner.programme, learner.employer, learner.issue]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesFilter = filter === "all" ? true : learner.status === filter || learner.issue.toLowerCase().includes(filter.toLowerCase());
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  const complianceTotals = {
    complete: learners.filter((l) => Object.values(l.compliance).every(Boolean)).length,
    missing: learners.filter((l) => !Object.values(l.compliance).every(Boolean)).length,
    signaturesPending: learners.filter((l) => !l.compliance.signatureReceived).length,
    docsPending: learners.filter((l) => !l.compliance.idReadable || !l.compliance.ifDocumentReceived).length,
    assessmentsPending: learners.filter((l) => l.assessments.some((a) => a.result !== "Competent")).length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium text-ink">Isivande Projects</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Operations Dashboard</h1>
          <p className="mt-2 text-sm text-ink">Empowering Futures, One Skill at a Time</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <div className="relative min-w-[280px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search learner, ID, business, issue" className="pl-9" />
          </div>
          <Button variant="outline" className="rounded-2xl"><Bell className="mr-2 h-4 w-4" />Alerts</Button>
          <div className="flex items-center gap-3 rounded-2xl border px-3 py-2">
            <Avatar className="h-8 w-8"><AvatarFallback>IP</AvatarFallback></Avatar>
            <div>
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-ink">Training Manager</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {kpis.map((kpi) => (
          <IconRow key={kpi.label} icon={kpi.icon} title={kpi.label} value={kpi.value} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Action Queue</CardTitle>
              <CardDescription>Resolve blockers, validate documents, and move learners to submission-ready.</CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[180px] rounded-2xl">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All learners</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="signature">Signature issues</SelectItem>
                  <SelectItem value="mismatch">Name mismatch</SelectItem>
                </SelectContent>
              </Select>
              <Button className="rounded-2xl"><ClipboardCheck className="mr-2 h-4 w-4" />Export queue</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-ink">
                    <th className="pb-3 font-medium">Learner</th>
                    <th className="pb-3 font-medium">Issue</th>
                    <th className="pb-3 font-medium">Programme</th>
                    <th className="pb-3 font-medium">Assigned</th>
                    <th className="pb-3 font-medium">Due</th>
                    <th className="pb-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((learner) => (
                    <tr key={learner.id} className="border-b last:border-0">
                      <td className="py-4">
                        <div>
                          <p className="font-medium">{learner.fullName}</p>
                          <p className="text-xs text-ink">{learner.idNumber}</p>
                        </div>
                      </td>
                      <td className="py-4">
                        <Badge variant="outline" className={statusBadge(learner.status)}>{learner.issue}</Badge>
                      </td>
                      <td className="py-4 text-ink">{learner.programme}</td>
                      <td className="py-4 text-ink">{learner.assignedTo}</td>
                      <td className="py-4 text-ink">{learner.dueDate}</td>
                      <td className="py-4">
                        <Button variant="outline" className="rounded-2xl" onClick={() => onSelectLearner(learner)}>
                          View learner <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Compliance Breakdown</CardTitle>
              <CardDescription>Live view of readiness across the current batch</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm"><span>Ready vs Missing</span><span>{complianceTotals.complete} / {complianceTotals.missing}</span></div>
                <Progress value={(complianceTotals.complete / (complianceTotals.complete + complianceTotals.missing)) * 100} />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm"><span>Signatures Complete</span><span>{learners.length - complianceTotals.signaturesPending} / {learners.length}</span></div>
                <Progress value={((learners.length - complianceTotals.signaturesPending) / learners.length) * 100} />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm"><span>Documents Approved</span><span>{learners.length - complianceTotals.docsPending} / {learners.length}</span></div>
                <Progress value={((learners.length - complianceTotals.docsPending) / learners.length) * 100} />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm"><span>Assessments Complete</span><span>{learners.length - complianceTotals.assessmentsPending} / {learners.length}</span></div>
                <Progress value={((learners.length - complianceTotals.assessmentsPending) / learners.length) * 100} />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>High-frequency admin tasks</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Button className="justify-start rounded-2xl"><Users className="mr-2 h-4 w-4" />Add learner</Button>
              <Button variant="outline" className="justify-start rounded-2xl"><Upload className="mr-2 h-4 w-4" />Upload documents</Button>
              <Button variant="outline" className="justify-start rounded-2xl"><FileText className="mr-2 h-4 w-4" />Create demand list</Button>
              <Button variant="outline" className="justify-start rounded-2xl"><Printer className="mr-2 h-4 w-4" />Generate signature pack</Button>
              <Button variant="outline" className="justify-start rounded-2xl"><Send className="mr-2 h-4 w-4" />Export submission report</Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Alerts</CardTitle>
              <CardDescription>Critical issues that block submission</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="rounded-xl border p-3">3 learners have unreadable ID copies</div>
              <div className="rounded-xl border p-3">5 signatures are overdue by more than 1 day</div>
              <div className="rounded-xl border p-3">2 invoice numbers still use placeholders</div>
              <div className="rounded-xl border p-3">4 corrections have been open for over 72 hours</div>
            </CardContent>
          </Card>
          <DeadlineTracker />
        </div>
      </div>
    </div>
  );
}

function LearnerProfile({ learner, onBack }: { learner: Learner; onBack: () => void }) {
  const docComplete = learner.documents.filter((d) => d.status === "approved").length;
  const docTotal = learner.documents.length;
  const correctionOpen = learner.corrections.filter((c) => c.status === "Open").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <Avatar className="h-14 w-14"><AvatarFallback>{learner.fullName.split(" ").slice(0, 2).map((n) => n[0]).join("")}</AvatarFallback></Avatar>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-tight">{learner.fullName}</h1>
              <Badge variant="outline" className={statusBadge(learner.status)}>{learner.status === "ready" ? "Ready" : learner.status === "blocked" ? "Blocked" : "In Progress"}</Badge>
            </div>
            <p className="mt-2 text-sm text-ink">{learner.idNumber} • {learner.programme} • {learner.employer}</p>
            <p className="mt-1 text-sm text-ink">Assigned to {learner.assignedTo}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="rounded-2xl" onClick={onBack}>Back to dashboard</Button>
          <Button variant="outline" className="rounded-2xl"><Upload className="mr-2 h-4 w-4" />Upload document</Button>
          <Button variant="outline" className="rounded-2xl"><Printer className="mr-2 h-4 w-4" />Print signature pack</Button>
          <Button className="rounded-2xl"><ShieldCheck className="mr-2 h-4 w-4" />Run readiness check</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <IconRow icon={ShieldCheck} title="Compliance Status" value={learner.status === "ready" ? "Ready" : "Blocked"} />
        <IconRow icon={FileCheck2} title="Documents" value={`${docComplete}/${docTotal} approved`} />
        <IconRow icon={PenSquare} title="Signatures" value={learner.compliance.signatureReceived ? "Complete" : "Pending"} />
        <IconRow icon={AlertCircle} title="Open Corrections" value={correctionOpen} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        <Tabs defaultValue="overview" className="rounded-2xl border bg-white p-4 shadow-sm">
          <TabsList className="grid h-auto w-full grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-2 lg:grid-cols-4 xl:grid-cols-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="demand">Demand List</TabsTrigger>
            <TabsTrigger value="signatures">Signatures</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="corrections">Corrections</TabsTrigger>
            <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="rounded-2xl shadow-none">
                <CardHeader><CardTitle className="text-base">Overview</CardTitle></CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-ink">Readiness</span><span className="font-medium">{learner.status === "ready" ? "Ready for submission" : "Blocked"}</span></div>
                  <div className="flex justify-between"><span className="text-ink">Documents</span><span className="font-medium">{docComplete}/{docTotal} approved</span></div>
                  <div className="flex justify-between"><span className="text-ink">Signatures</span><span className="font-medium">{learner.compliance.signatureReceived ? "Verified" : "Pending"}</span></div>
                  <div className="flex justify-between"><span className="text-ink">Corrections</span><span className="font-medium">{correctionOpen} open</span></div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl shadow-none">
                <CardHeader><CardTitle className="text-base">Next actions</CardTitle></CardHeader>
                <CardContent className="grid gap-3">
                  <Button variant="outline" className="justify-start rounded-2xl">Request missing documents</Button>
                  <Button variant="outline" className="justify-start rounded-2xl">Generate signature request</Button>
                  <Button variant="outline" className="justify-start rounded-2xl">Create correction entry</Button>
                </CardContent>
              </Card>
            </div>
            <ComplianceSummary learner={learner} />
          </TabsContent>

          <TabsContent value="documents" className="mt-4">
            <Card className="rounded-2xl shadow-none">
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>Validation, review, readability and version tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-ink">
                        <th className="pb-3 font-medium">Type</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium">Version</th>
                        <th className="pb-3 font-medium">Readable</th>
                        <th className="pb-3 font-medium">Reviewed By</th>
                        <th className="pb-3 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {learner.documents.map((doc) => (
                        <tr key={doc.type} className="border-b last:border-0">
                          <td className="py-4 font-medium">{doc.type}</td>
                          <td className="py-4"><Badge variant="outline" className={statusBadge(doc.status)}>{doc.status}</Badge></td>
                          <td className="py-4">v{doc.version}</td>
                          <td className="py-4">{doc.readable ? "Yes" : "No"}</td>
                          <td className="py-4">{doc.reviewedBy || "—"}</td>
                          <td className="py-4">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="rounded-xl">Approve</Button>
                              <Button size="sm" variant="outline" className="rounded-xl">Reject</Button>
                              <Button size="sm" variant="outline" className="rounded-xl">Upload new</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="mt-4">
            <ComplianceSummary learner={learner} />
          </TabsContent>

          <TabsContent value="demand" className="mt-4">
            <Card className="rounded-2xl shadow-none">
              <CardHeader>
                <CardTitle>Demand List</CardTitle>
                <CardDescription>Structured procurement request for learner business support</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-slate-100 text-ink">{learner.demandList.length > 0 ? learner.demandList[0].status : "Draft"}</Badge>
                  <Button variant="outline" className="rounded-2xl"><FileText className="mr-2 h-4 w-4" />Add item</Button>
                  <Button variant="outline" className="rounded-2xl"><PenSquare className="mr-2 h-4 w-4" />Send for signature</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-ink">
                        <th className="pb-3 font-medium">Item</th>
                        <th className="pb-3 font-medium">Quantity</th>
                        <th className="pb-3 font-medium">Cost</th>
                        <th className="pb-3 font-medium">Supplier</th>
                        <th className="pb-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {learner.demandList.length ? learner.demandList.map((item) => (
                        <tr key={item.item} className="border-b last:border-0">
                          <td className="py-4 font-medium">{item.item}</td>
                          <td className="py-4">{item.quantity}</td>
                          <td className="py-4">{item.cost}</td>
                          <td className="py-4">{item.supplier}</td>
                          <td className="py-4"><Badge variant="outline" className="bg-amber-100 text-amber-700">{item.status}</Badge></td>
                        </tr>
                      )) : (
                        <tr><td className="py-6 text-ink" colSpan={5}>No demand list items added yet.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signatures" className="mt-4">
            <Card className="rounded-2xl shadow-none">
              <CardHeader>
                <CardTitle>Signature Workflow</CardTitle>
                <CardDescription>Track requested → printed → signed → uploaded → verified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 md:grid-cols-5">
                  {learner.signatures.map((step) => (
                    <div key={step.step} className="rounded-2xl border p-4">
                      <div className="flex items-center gap-2">
                        {step.done ? <CheckCircle2 className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}
                        <p className="font-medium">{step.step}</p>
                      </div>
                      <p className="mt-2 text-xs text-ink">{step.date || "Pending"}</p>
                      <p className="text-xs text-ink">{step.by || "—"}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" className="rounded-2xl"><Printer className="mr-2 h-4 w-4" />Generate printable pack</Button>
                  <Button variant="outline" className="rounded-2xl"><Upload className="mr-2 h-4 w-4" />Upload signed file</Button>
                  <Button className="rounded-2xl"><ShieldCheck className="mr-2 h-4 w-4" />Verify signature</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assessments" className="mt-4">
            <Card className="rounded-2xl shadow-none">
              <CardHeader>
                <CardTitle>Assessments</CardTitle>
                <CardDescription>Assessor and moderator outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-ink">
                        <th className="pb-3 font-medium">Module</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium">Assessor</th>
                        <th className="pb-3 font-medium">Moderator</th>
                        <th className="pb-3 font-medium">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {learner.assessments.length ? learner.assessments.map((item) => (
                        <tr key={item.module} className="border-b last:border-0">
                          <td className="py-4 font-medium">{item.module}</td>
                          <td className="py-4">{item.status}</td>
                          <td className="py-4">{item.assessor}</td>
                          <td className="py-4">{item.moderator}</td>
                          <td className="py-4">{item.result}</td>
                        </tr>
                      )) : (
                        <tr><td className="py-6 text-ink" colSpan={5}>No assessments linked yet.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="corrections" className="mt-4">
            <Card className="rounded-2xl shadow-none">
              <CardHeader>
                <CardTitle>Corrections Log</CardTitle>
                <CardDescription>Track changes to identity, financial, and compliance records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex gap-3">
                  <Button variant="outline" className="rounded-2xl"><AlertCircle className="mr-2 h-4 w-4" />Add correction</Button>
                  <Button variant="outline" className="rounded-2xl"><ShieldCheck className="mr-2 h-4 w-4" />Approve correction</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-ink">
                        <th className="pb-3 font-medium">Field</th>
                        <th className="pb-3 font-medium">Old</th>
                        <th className="pb-3 font-medium">New</th>
                        <th className="pb-3 font-medium">Reason</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {learner.corrections.length ? learner.corrections.map((item, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-4 font-medium">{item.field}</td>
                          <td className="py-4">{item.oldValue}</td>
                          <td className="py-4">{item.newValue || "—"}</td>
                          <td className="py-4">{item.reason}</td>
                          <td className="py-4"><Badge variant="outline" className={statusBadge(item.status)}>{item.status}</Badge></td>
                          <td className="py-4">{item.date}</td>
                        </tr>
                      )) : (
                        <tr><td className="py-6 text-ink" colSpan={6}>No corrections recorded.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit" className="mt-4">
            <Card className="rounded-2xl shadow-none">
              <CardHeader>
                <CardTitle>Audit Trail</CardTitle>
                <CardDescription>Immutable event history for learner actions</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[420px] pr-4">
                  <div className="space-y-4">
                    {learner.timeline.map((event, idx) => (
                      <div key={idx} className="flex gap-3 rounded-2xl border p-4">
                        <div className="mt-1"><Clock3 className="h-4 w-4" /></div>
                        <div>
                          <p className="font-medium">{event.event}</p>
                          <p className="text-sm text-ink">{event.at}</p>
                          <p className="text-xs text-ink">by {event.by}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="space-y-6">
          <ComplianceSummary learner={learner} />

          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Global Compliance Queue</CardTitle>
              <CardDescription>Similar issues across the current cohort</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {learners.filter((l) => l.id !== learner.id).map((item) => (
                <button key={item.id} onClick={() => {}} className="flex w-full items-center justify-between rounded-2xl border p-3 text-left">
                  <div>
                    <p className="font-medium">{item.fullName}</p>
                    <p className="text-xs text-ink">{item.issue}</p>
                  </div>
                  <Badge variant="outline" className={statusBadge(item.status)}>{item.status}</Badge>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Action Center</CardTitle>
              <CardDescription>Fast controls for admin workflow</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Button variant="outline" className="justify-start rounded-2xl"><Send className="mr-2 h-4 w-4" />Send reminder</Button>
              <Button variant="outline" className="justify-start rounded-2xl"><Receipt className="mr-2 h-4 w-4" />Validate invoice</Button>
              <Button variant="outline" className="justify-start rounded-2xl"><UserCircle2 className="mr-2 h-4 w-4" />Verify legal name</Button>
              <Button className="justify-start rounded-2xl"><ShieldCheck className="mr-2 h-4 w-4" />Mark submission ready</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function AdminPortal() {
  const [selectedLearner, setSelectedLearner] = useState<Learner | null>(null);

  if (selectedLearner) {
    return <LearnerProfile learner={selectedLearner} onBack={() => setSelectedLearner(null)} />;
  }

  return <AdminDashboard onSelectLearner={setSelectedLearner} />;
}
