import {
  Zap, Briefcase, Calendar, MapPin, GraduationCap, Layers, Building2,
  UserCog, Brain, ShieldCheck, Trophy, Lightbulb, Power, HardHat,
  Box, CircuitBoard, BookOpen, Palette, ClipboardList, Bug, Terminal, Code,
} from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import SubLabel from '../components/SubLabel'
import {
  RcoCard, DetailCard, ProjectHeroCard, TagRow,
  LightingIllustration, WiringIllustration, PcbIllustration,
  ThreeDBoxIllustration, BlindStickIllustration,
} from '../components/WorkCards'

export default function Work() {
  return (
    <div className="px-8 md:px-20 py-16" style={{ background: 'var(--bg-2)' }}>
      {/* Page header */}
      <ScrollReveal>
        <p className="text-xs font-bold tracking-[3px] mb-3" style={{ color: 'var(--eyebrow)' }}>
          02 — WORK & PROJECTS
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h1
          className="text-4xl md:text-5xl font-bold mb-3"
          style={{ color: 'var(--head)', fontFamily: 'Playfair Display, serif', letterSpacing: '-1px' }}
        >
          Experience & Engineering.
        </h1>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="text-sm max-w-xl mb-14" style={{ color: 'var(--body)' }}>
          Real-world experience and hands-on engineering projects that shaped my technical foundation.
        </p>
      </ScrollReveal>

      {/* ═══════════════ SECTION A — WORK IMMERSION ═══════════════ */}
      <ScrollReveal><SubLabel>Work Immersion</SubLabel></ScrollReveal>
      <div className="mt-5">
        <ScrollReveal delay={0.1}>
          <ProjectHeroCard
            chips={['WORK IMMERSION  ·  2024', 'Electrical Maintenance']}
            title="Ibayiw Integrated National High School"
            description="Providing essential electrical maintenance services to ensure a safe and fully functional learning environment for students and faculty."
            badges={[
              { icon: HardHat, text: 'Electrical Technician Trainee' },
              { icon: Calendar, text: '2024' },
              { icon: MapPin, text: 'Alaminos, Laguna' },
              { icon: GraduationCap, text: 'DepEd — Senior High School' },
            ]}
            icon={Zap}
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <ScrollReveal delay={0.1}>
            <RcoCard icon={UserCog} title="What I Did" body="Performed hands-on electrical maintenance, troubleshooting, and repair of classroom lighting fixtures, electrical outlets, and wiring systems throughout the school premises." />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <RcoCard icon={Brain} title="Key Focus" body="Assisted in the installation of new electrical components and ensured every task was completed with precision — from diagnosing faults to restoring full electrical function in each area." />
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <RcoCard icon={ShieldCheck} title="Safety & Compliance" body="All work was carried out in strict compliance with standard electrical safety protocols to maintain a secure learning environment for students, teachers, and support staff at all times." />
          </ScrollReveal>
        </div>

        <div className="mt-11"><ScrollReveal><SubLabel>Work Activities</SubLabel></ScrollReveal></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <ScrollReveal delay={0.1}>
            <DetailCard
              icon={Lightbulb} title="Lighting Maintenance"
              visual={{ type: 'illustration', node: <LightingIllustration /> }}
              caption="Fluorescent · LED · Fixtures"
              description="Inspected, repaired, and replaced faulty lighting fixtures across multiple classrooms. Tasks included ballast replacements, tube swaps, and socket repairs."
            />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <DetailCard
              icon={Power} title="Outlets & Wiring"
              visual={{ type: 'illustration', node: <WiringIllustration /> }}
              caption="Outlets · Wiring · Circuits"
              description="Diagnosed and repaired damaged electrical outlets and wiring faults. Ensured correct load distribution and safe connections across circuits."
            />
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <DetailCard
              icon={HardHat} title="Component Installation"
              visual={{ type: 'checklist', items: ['New lighting fixtures', 'Electrical outlets', 'Circuit breakers', 'Switches & panels', 'Conduit & cable runs'] }}
              description="Assisted licensed electricians in installing new electrical infrastructure across designated areas, following blueprints and safety standards."
            />
          </ScrollReveal>
        </div>

        <div className="mt-8">
          <ScrollReveal>
            <TagRow
              label="Skills Gained"
              items={['Electrical Troubleshooting', 'Lighting Systems', 'Wiring & Outlets', 'Safety Protocols', 'Component Installation', 'Circuit Repair', 'Preventive Maintenance']}
            />
          </ScrollReveal>
        </div>
      </div>

      <div className="h-px my-16" style={{ background: 'var(--line)' }} />

      {/* ═══════════════ SECTION B — NAVIRA THESIS ═══════════════ */}
      <ScrollReveal><SubLabel>Projects</SubLabel></ScrollReveal>
      <div className="mt-5">
        <ScrollReveal delay={0.1}>
          <ProjectHeroCard
            chips={['UNDERGRADUATE THESIS  ·  2025–2026', 'Embedded Systems']}
            title="NAVIRA"
            titleSize={64}
            description="An ESP32-Based Smart Blind Stick with Wireless Armband Integration for Enhanced Mobility of the Visually Impaired"
            badges={[
              { icon: UserCog, text: 'Lead Designer & Developer' },
              { icon: Calendar, text: '2025' },
              { icon: GraduationCap, text: 'BS Computer Engineering' },
            ]}
            iconNode={<BlindStickIllustration />}
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <ScrollReveal delay={0.1}>
            <RcoCard icon={UserCog} title="My Role" body="As one of seven developers, I contributed to the hardware design including PCB layout in KiCad, firmware programming in C++ for the ESP32 microcontroller, and integration of the UWB-based wireless armband communication system." />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <RcoCard icon={Brain} title="The Challenge" body="Developing a cost-effective assistive device that accurately detects both ground-level and elevated obstacles, identifies wet surfaces to prevent slips, and provides intuitive haptic and audio feedback for visually impaired users." />
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <RcoCard icon={Trophy} title="The Outcome" body="A functional prototype validated by Computer Engineering practitioners with an overall mean score of 4.6 / 5.0 (Highly Acceptable). The device demonstrated obstacle detection up to 2 m, water detection across varying depths, and reliable UWB tracking within 10 m." />
          </ScrollReveal>
        </div>

        <div className="mt-11"><ScrollReveal><SubLabel>Project Deliverables</SubLabel></ScrollReveal></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <ScrollReveal delay={0.1}>
            <DetailCard
              icon={Box} title="3D Model"
              visual={{ type: 'illustration', node: <ThreeDBoxIllustration /> }}
              caption="Fusion 360"
              description="Full enclosure designed in Fusion 360. Ergonomic grip, sensor mounting ports, and compartment for ESP32 PCB."
            />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <DetailCard
              icon={CircuitBoard} title="Device Design"
              visual={{ type: 'illustration', node: <PcbIllustration /> }}
              caption="KiCad · ESP32"
              description="Schematic capture and PCB layout in KiCad. Integrates ESP32 UWB, dual VL53L0X ToF sensors, vibration motor, and water detection circuit."
            />
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <DetailCard
              icon={BookOpen} title="Research Paper"
              visual={{ type: 'checklist', items: ['Theoretical Framework', 'Review of Related Literature', 'Flow Chart', 'Project Benefits', 'Recommendation'] }}
              description="Full academic manuscript covering theoretical framework, design methodology, hardware/software testing results, and evaluation based on ISO 25010 standards."
            />
          </ScrollReveal>
        </div>

        <div className="mt-8">
          <ScrollReveal>
            <TagRow
              label="Tech Stack"
              items={['ESP32', 'C++', 'VL53L0X ToF', 'Copper Wire Water Detection', 'DFPlayer Mini', 'KiCad', 'Fusion 360', 'ESP-NOW', 'AutoCAD']}
            />
          </ScrollReveal>
        </div>
      </div>

      <div className="h-px my-16" style={{ background: 'var(--line)' }} />

      {/* ═══════════════ SECTION C — OJT / FDS ASYA ═══════════════ */}
      <ScrollReveal><SubLabel>On-the-Job Training</SubLabel></ScrollReveal>
      <div className="mt-5">
        <ScrollReveal delay={0.1}>
          <ProjectHeroCard
            chips={['OJT  ·  2026', '5 Departments']}
            title={'FDS Asya\nPhilippines Inc.'}
            description="Completed on-the-job training across five departments — gaining cross-functional experience in creative production, systems analysis, quality assurance, technical support, and full-stack web development."
            badges={[
              { icon: Briefcase, text: 'OJT Intern' },
              { icon: Calendar, text: '2025' },
              { icon: MapPin, text: 'Philippines' },
              { icon: Layers, text: '5 Departments Rotated' },
            ]}
            icon={Building2}
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <ScrollReveal delay={0.1}>
            <RcoCard icon={UserCog} title="Role" body="Rotated as an OJT intern across five departments, taking on real tasks in each unit — from creative content production to system proposals, QA testing, server deployment, and full-stack web development." />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <RcoCard icon={Brain} title="Key Takeaway" body="Each rotation exposed me to a different discipline of software and IT practice — sharpening both my technical depth and my ability to adapt quickly across diverse professional environments." />
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <RcoCard icon={Trophy} title="Highlight" body="Built PiraTern — a fully functional pirate-themed (One Piece) intern profile website using Flutter for the frontend and Go for the backend, delivered as the capstone output of the Development Unit rotation." />
          </ScrollReveal>
        </div>

        <div className="mt-11"><ScrollReveal><SubLabel>Department Rotations</SubLabel></ScrollReveal></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <ScrollReveal delay={0.1}>
            <DetailCard
              icon={Palette} title="BRM" subtitle="Business Relationship Management"
              visual={{ type: 'checklist', items: ['Poster Editing', 'Brochure Design', 'Presentation (PPT)', 'Video Editing'] }}
              description="Focused on creative editing tasks — producing and refining marketing materials including posters, brochures, presentations, and video content."
            />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <DetailCard
              icon={ClipboardList} title="PMO" subtitle="Project Management Office"
              visual={{ type: 'checklist', items: ['System Proposal', 'Requirements Analysis', 'InternSight Platform', 'Documentation'] }}
              description="Collaborated on a system proposal for InternSight — an intern monitoring platform designed to streamline tracking and management of company interns."
            />
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <DetailCard
              icon={Bug} title="QA" subtitle="Quality Assurance"
              visual={{ type: 'checklist', items: ['API Testing (Postman)', 'Load Testing (JMeter)', 'Test Case Writing', 'App Testing'] }}
              description="Tested a mock API using Postman and JMeter for functional and load validation. Wrote structured test cases and performed end-to-end app testing."
            />
          </ScrollReveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 max-w-[calc(66%-0.5rem)]">
          <ScrollReveal delay={0.1}>
            <DetailCard
              icon={Terminal} title="Technical Support" subtitle="Technical Support Department"
              visual={{ type: 'checklist', items: ['Linux CLI Commands', 'Server Deployment', 'Remote Code Deploy', 'System Administration'] }}
              description="Learned and applied Linux CLI commands for server operations. Deployed code to a supervisor-provisioned server using Linux-based deployment workflows."
            />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <DetailCard
              icon={Code} title="Development Unit" subtitle="Software Development Department"
              visual={{ type: 'checklist', items: ['Flutter (Frontend)', 'Go (Backend)', 'PiraTern Website', 'One Piece Pirate Theme'] }}
              description='Built PiraTern — a pirate-themed (One Piece) intern profile viewing website using Flutter for the frontend and Go for the backend.'
            />
          </ScrollReveal>
        </div>

        <div className="mt-8">
          <ScrollReveal>
            <TagRow
              label="Tools & Tech"
              items={['Flutter', 'Go', 'Postman', 'JMeter', 'Linux CLI', 'Adobe Premiere', 'Canva', 'Figma']}
            />
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}