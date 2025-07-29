import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Users, Target, Code, Euro } from 'lucide-react';

interface FormData {
  // Grunddaten
  name: string;
  email: string;
  phone: string;
  companyName: string;
  companyStage: string;
  website: string;
  linkedin: string;
  industry: string;
  
  // Team und Phase
  teamSize: string;
  revenue: string;
  hasProduct: string;
  productDescription: string;
  
  // Ziele
  mainReasons: string[];
  painPoint: string;
  futureGoals: string;
  priority: string;
  
  // Technische Details
  hasTechTeam: string;
  techPreferences: string;
  hasIdeas: string;
  timeline: string;
  
  // Budget
  budget: string;
  hasWorkedWithAgencies: string;
  
  // Zusätzlich
  additionalComments: string;
}

const VeraClientForm: React.FC = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    companyStage: '',
    website: '',
    linkedin: '',
    industry: '',
    teamSize: '',
    revenue: '',
    hasProduct: '',
    productDescription: '',
    mainReasons: [],
    painPoint: '',
    futureGoals: '',
    priority: '',
    hasTechTeam: '',
    techPreferences: '',
    hasIdeas: '',
    timeline: '',
    budget: '',
    hasWorkedWithAgencies: '',
    additionalComments: ''
  });

  const totalSteps = 6;

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (reason: string, checked: boolean) => {
    const currentReasons = formData.mainReasons;
    if (checked) {
      updateFormData('mainReasons', [...currentReasons, reason]);
    } else {
      updateFormData('mainReasons', currentReasons.filter(r => r !== reason));
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Formular erfolgreich eingereicht!",
      description: "Vielen Dank für Ihre Angaben. Wir melden uns in Kürze bei Ihnen.",
    });
    console.log('Form submitted:', formData);
  };

  // Validation functions for each step
  const validateStep1 = () => {
    return formData.name.trim() !== '' && 
           formData.email.trim() !== '' && 
           formData.companyName.trim() !== '' && 
           formData.industry.trim() !== '';
  };

  const validateStep2 = () => {
    return formData.teamSize !== '' && 
           formData.revenue !== '' && 
           formData.hasProduct !== '';
  };

  const validateStep3 = () => {
    return formData.mainReasons.length > 0;
  };

  const validateStep4 = () => {
    return formData.hasTechTeam !== '' && 
           formData.timeline !== '';
  };

  const validateStep5 = () => {
    return formData.budget !== '' && 
           formData.hasWorkedWithAgencies !== '';
  };

  const validateStep6 = () => {
    return true; // Step 6 has no required fields
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1: return validateStep1();
      case 2: return validateStep2();
      case 3: return validateStep3();
      case 4: return validateStep4();
      case 5: return validateStep5();
      case 6: return validateStep6();
      default: return false;
    }
  };

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else if (!validateCurrentStep()) {
      toast({
        title: "Unvollständige Angaben",
        description: "Bitte füllen Sie alle Pflichtfelder aus, bevor Sie fortfahren.",
        variant: "destructive",
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderProgressBar = () => (
    <div className="w-full bg-muted rounded-full h-2 mb-8">
      <div 
        className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      />
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Users className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold">Grunddaten über Ihr Unternehmen</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name und Vorname *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            placeholder="Max Mustermann"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">E-Mail-Adresse *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            placeholder="max@unternehmen.de"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Telefonnummer</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            placeholder="+49 123 456789"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="companyName">Firmenname *</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) => updateFormData('companyName', e.target.value)}
            placeholder="Mein Unternehmen GmbH"
            required
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <Label>Ist Ihr Unternehmen in der Gründungsphase?</Label>
        <RadioGroup value={formData.companyStage} onValueChange={(value) => updateFormData('companyStage', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ja" id="stage-yes" />
            <Label htmlFor="stage-yes">Ja</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nein" id="stage-no" />
            <Label htmlFor="stage-no">Nein</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="zwischen" id="stage-between" />
            <Label htmlFor="stage-between">Etwas dazwischen (z.B. bereits tätig, aber noch nicht formell registriert)</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="website">Website des Unternehmens</Label>
        <Input
          id="website"
          value={formData.website}
          onChange={(e) => updateFormData('website', e.target.value)}
          placeholder="www.meinunternehmen.de oder 'noch keine'"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="linkedin">LinkedIn-Profil des Unternehmens</Label>
        <Input
          id="linkedin"
          value={formData.linkedin}
          onChange={(e) => updateFormData('linkedin', e.target.value)}
          placeholder="linkedin.com/company/meinunternehmen"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="industry">Was ist Ihre Branche/Industrie? *</Label>
        <Input
          id="industry"
          value={formData.industry}
          onChange={(e) => updateFormData('industry', e.target.value)}
          placeholder="z.B. Herstellung von Naturkosmetik, Online-Bildung, SaaS für Logistik"
          required
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Target className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold">Team und aktuelle Phase</h3>
      </div>
      
      <div className="space-y-3">
        <Label>Wie viele Teammitglieder haben Sie derzeit?</Label>
        <Select value={formData.teamSize} onValueChange={(value) => updateFormData('teamSize', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Teamgröße auswählen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2-5">2–5</SelectItem>
            <SelectItem value="6-10">6–10</SelectItem>
            <SelectItem value="11-20">11–20</SelectItem>
            <SelectItem value="21+">21+</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-3">
        <Label>Wie hoch war Ihr Jahresumsatz im letzten Jahr?</Label>
        <Select value={formData.revenue} onValueChange={(value) => updateFormData('revenue', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Umsatz auswählen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gruendung">Unternehmen in Gründung / noch kein Umsatz</SelectItem>
            <SelectItem value="unter-10k">Weniger als 10.000 EUR</SelectItem>
            <SelectItem value="10k-30k">10.000 – 30.000 EUR</SelectItem>
            <SelectItem value="30k-100k">30.000 – 100.000 EUR</SelectItem>
            <SelectItem value="100k-250k">100.000 – 250.000 EUR</SelectItem>
            <SelectItem value="250k-500k">250.000 – 500.000 EUR</SelectItem>
            <SelectItem value="ueber-500k">Mehr als 500.000 EUR</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-3">
        <Label>Haben Sie bereits ein konkretes Produkt, eine App oder Website in Betrieb?</Label>
        <RadioGroup value={formData.hasProduct} onValueChange={(value) => updateFormData('hasProduct', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ja" id="product-yes" />
            <Label htmlFor="product-yes">Ja</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nein" id="product-no" />
            <Label htmlFor="product-no">Nein</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="entwicklung" id="product-dev" />
            <Label htmlFor="product-dev">In Entwicklung</Label>
          </div>
        </RadioGroup>
      </div>
      
      {formData.hasProduct === 'ja' && (
        <div className="space-y-2">
          <Label htmlFor="productDescription">Bitte geben Sie den Link oder eine kurze Beschreibung an:</Label>
          <Textarea
            id="productDescription"
            value={formData.productDescription}
            onChange={(e) => updateFormData('productDescription', e.target.value)}
            placeholder="Link oder Beschreibung Ihres Produkts"
            rows={3}
          />
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Target className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold">Ziele und Bedürfnisse</h3>
      </div>
      
      <div className="space-y-3">
        <Label>Was ist der Hauptgrund, warum Sie sich an VERA IT gewandt haben? (Mehrfachauswahl möglich)</Label>
        <div className="space-y-3">
          {[
            'Entwicklung von Softwarelösungen (Web, Mobile App usw.)',
            'Digitale Transformation des Unternehmens',
            'Beratung zur digitalen Strategie',
            'Automatisierung von Prozessen',
            'Steigerung der Verkäufe über digitale Kanäle',
            'Branding und UI/UX Design',
            'Erstellung oder Verbesserung der Website',
            'Cloud-Migration / DevOps / Technischer Support'
          ].map((reason) => (
            <div key={reason} className="flex items-center space-x-2">
              <Checkbox
                id={reason}
                checked={formData.mainReasons.includes(reason)}
                onCheckedChange={(checked) => handleCheckboxChange(reason, checked as boolean)}
              />
              <Label htmlFor={reason} className="text-sm">{reason}</Label>
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <Checkbox id="other" />
            <Label htmlFor="other" className="text-sm">Sonstiges: ____________</Label>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="painPoint">Was ist derzeit Ihre größte Herausforderung?</Label>
        <Textarea
          id="painPoint"
          value={formData.painPoint}
          onChange={(e) => updateFormData('painPoint', e.target.value)}
          placeholder="Beschreiben Sie Ihre aktuelle Herausforderung (max. 500 Zeichen)"
          rows={3}
          maxLength={500}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="futureGoals">Wo möchten Sie in 12 Monaten stehen (digital gesehen)?</Label>
        <Textarea
          id="futureGoals"
          value={formData.futureGoals}
          onChange={(e) => updateFormData('futureGoals', e.target.value)}
          placeholder="Beschreiben Sie Ihre Ziele für die nächsten 12 Monate (max. 500 Zeichen)"
          rows={3}
          maxLength={500}
        />
      </div>
      
      <div className="space-y-3">
        <Label>Was ist Ihnen derzeit wichtiger?</Label>
        <RadioGroup value={formData.priority} onValueChange={(value) => updateFormData('priority', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="umsatz" id="priority-revenue" />
            <Label htmlFor="priority-revenue">Umsatzsteigerung</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="kosten" id="priority-costs" />
            <Label htmlFor="priority-costs">Kostensenkung</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="optimierung" id="priority-optimization" />
            <Label htmlFor="priority-optimization">Optimierung der Geschäftsprozesse</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="markt" id="priority-market" />
            <Label htmlFor="priority-market">Schnellerer Markteintritt</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="branding" id="priority-branding" />
            <Label htmlFor="priority-branding">Branding und Positionierung</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Code className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold">Technische Details und Erwartungen</h3>
      </div>
      
      <div className="space-y-3">
        <Label>Haben Sie bereits ein technisches Team oder Partner?</Label>
        <RadioGroup value={formData.hasTechTeam} onValueChange={(value) => updateFormData('hasTechTeam', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ja" id="tech-yes" />
            <Label htmlFor="tech-yes">Ja</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nein" id="tech-no" />
            <Label htmlFor="tech-no">Nein</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="teilweise" id="tech-partial" />
            <Label htmlFor="tech-partial">Teilweise (z.B. gelegentlich Freelancer)</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="techPreferences">Bevorzugen Sie bestimmte Technologien?</Label>
        <Input
          id="techPreferences"
          value={formData.techPreferences}
          onChange={(e) => updateFormData('techPreferences', e.target.value)}
          placeholder="z.B. React, Next.js, WordPress, Laravel, Python... oder 'nicht sicher'"
        />
      </div>
      
      <div className="space-y-3">
        <Label>Haben Sie bereits Ideen/Skizzen/Beispiele für die gewünschte Lösung?</Label>
        <RadioGroup value={formData.hasIdeas} onValueChange={(value) => updateFormData('hasIdeas', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ja" id="ideas-yes" />
            <Label htmlFor="ideas-yes">Ja (können Link hinzufügen oder Datei hochladen)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nein" id="ideas-no" />
            <Label htmlFor="ideas-no">Noch nicht, wir erwarten Hilfe von Ihnen</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="teilweise" id="ideas-partial" />
            <Label htmlFor="ideas-partial">Teilweise – wir haben eine Vision</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-3">
        <Label>Wie ist der ungefähre Zeitrahmen für den Projektstart?</Label>
        <Select value={formData.timeline} onValueChange={(value) => updateFormData('timeline', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Zeitrahmen auswählen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sofort">Sofort</SelectItem>
            <SelectItem value="4-wochen">In den nächsten 4 Wochen</SelectItem>
            <SelectItem value="2-3-monate">In den nächsten 2–3 Monaten</SelectItem>
            <SelectItem value="spaeter">Später als 3 Monate</SelectItem>
            <SelectItem value="unbekannt">Noch nicht sicher</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Euro className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold">Budget und Offenheit für Zusammenarbeit</h3>
      </div>
      
      <div className="bg-muted/50 p-4 rounded-lg mb-4">
        <p className="text-sm text-muted-foreground">
          Diese Information ist vertraulich und dient nur unserer internen Bewertung und Lösungsempfehlung.
        </p>
      </div>
      
      <div className="space-y-3">
        <Label>Haben Sie einen ungefähren Budgetrahmen für das Projekt?</Label>
        <Select value={formData.budget} onValueChange={(value) => updateFormData('budget', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Budget auswählen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bis-3k">Bis zu 3.000 EUR</SelectItem>
            <SelectItem value="3k-7k">3.000 – 7.000 EUR</SelectItem>
            <SelectItem value="7k-15k">7.000 – 15.000 EUR</SelectItem>
            <SelectItem value="15k-30k">15.000 – 30.000 EUR</SelectItem>
            <SelectItem value="30k-50k">30.000 – 50.000 EUR</SelectItem>
            <SelectItem value="50k+">50.000+ EUR</SelectItem>
            <SelectItem value="kein-budget">Noch kein klares Budget</SelectItem>
            <SelectItem value="vorschlag">Wir erwarten einen Vorschlag von Ihnen</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-3">
        <Label>Haben Sie bereits mit IT-Unternehmen oder Agenturen zusammengearbeitet?</Label>
        <RadioGroup value={formData.hasWorkedWithAgencies} onValueChange={(value) => updateFormData('hasWorkedWithAgencies', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ja" id="agencies-yes" />
            <Label htmlFor="agencies-yes">Ja</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nein" id="agencies-no" />
            <Label htmlFor="agencies-no">Nein</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="teilweise" id="agencies-partial" />
            <Label htmlFor="agencies-partial">Teilweise (z.B. Einzelpersonen, Freelancer)</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Target className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold">Zusätzliche Fragen / Kommentare</h3>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="additionalComments">
          Gibt es noch etwas, was Sie vor unserem ersten Gespräch mit uns teilen möchten?
        </Label>
        <Textarea
          id="additionalComments"
          value={formData.additionalComments}
          onChange={(e) => updateFormData('additionalComments', e.target.value)}
          placeholder="Ihre zusätzlichen Kommentare oder Fragen..."
          rows={4}
        />
      </div>
      
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
        <h4 className="text-lg font-semibold mb-2">✅ Ende des Formulars</h4>
        <p className="text-muted-foreground mb-4">
          Vielen Dank für Ihre Zeit! Basierend auf Ihren Antworten werden wir uns so schnell wie möglich bei Ihnen melden, 
          um ein Gespräch zu vereinbaren und zu sehen, ob und wie wir eine erfolgreiche Zusammenarbeit verwirklichen können.
        </p>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      case 6: return renderStep6();
      default: return renderStep1();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        <Card className="vera-card">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <img 
                src="/lovable-uploads/5de1e284-0fee-4f15-b14a-2b1bde86aefd.png" 
                alt="Vera IT Logo" 
                className="h-12 w-auto"
              />
            </div>
            <CardTitle className="text-3xl font-bold text-white">
              📋 VERA IT – Formular für neue Kunden
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Bitte nehmen Sie sich 5–10 Minuten Zeit, um dieses Formular auszufüllen. 
              Basierend auf Ihren Antworten wird sich unser Team auf das erste Gespräch vorbereiten 
              und bewerten, wie wir Ihnen am besten helfen können.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {renderProgressBar()}
            
            <div className="text-center mb-6">
              <span className="text-sm text-muted-foreground">
                Schritt {currentStep} von {totalSteps}
              </span>
            </div>
            
            {renderCurrentStep()}
            
            <div className="flex justify-between pt-6 border-t border-border">
              <Button 
                variant="outline" 
                onClick={prevStep} 
                disabled={currentStep === 1}
              >
                Zurück
              </Button>
              
              {currentStep < totalSteps ? (
                <Button 
                  variant="vera" 
                  size="lg" 
                  onClick={nextStep}
                  disabled={!validateCurrentStep()}
                  className="min-w-[120px]"
                >
                  Weiter <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  variant="vera" 
                  size="lg" 
                  onClick={handleSubmit}
                  className="min-w-[120px]"
                >
                  Absenden <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VeraClientForm;