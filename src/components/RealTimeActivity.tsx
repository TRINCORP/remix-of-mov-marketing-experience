import { useState, useEffect } from 'react';
import { CheckCircle, Clock, TrendingUp, Users } from 'lucide-react';

interface Activity {
  id: string;
  type: 'conversion' | 'engagement' | 'lead' | 'campaign';
  message: string;
  timestamp: Date;
  location: string;
}

const activities: Omit<Activity, 'id' | 'timestamp'>[] = [
  {
    type: 'conversion',
    message: 'Nova conversão gerada através do Facebook Ads',
    location: 'São Paulo, SP'
  },
  {
    type: 'engagement',
    message: 'Taxa de engajamento aumentou 45% no Instagram',
    location: 'Rio de Janeiro, RJ'
  },
  {
    type: 'lead',
    message: 'Lead qualificado capturado via Google Ads',
    location: 'Belo Horizonte, MG'
  },
  {
    type: 'campaign',
    message: 'Campanha de email marketing com 68% de abertura',
    location: 'Curitiba, PR'
  },
  {
    type: 'conversion',
    message: 'ROI de 340% atingido em campanha de performance',
    location: 'Porto Alegre, RS'
  },
  {
    type: 'engagement',
    message: 'Alcance orgânico cresceu 120% nas redes sociais',
    location: 'Recife, PE'
  },
  {
    type: 'lead',
    message: 'Funil de vendas otimizado com 85% de conversão',
    location: 'Salvador, BA'
  },
  {
    type: 'campaign',
    message: 'Automação de marketing entregou 50 novos leads',
    location: 'Fortaleza, CE'
  }
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'conversion':
      return CheckCircle;
    case 'engagement':
      return TrendingUp;
    case 'lead':
      return Users;
    case 'campaign':
      return Clock;
    default:
      return CheckCircle;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'conversion':
      return 'text-green-500';
    case 'engagement':
      return 'text-blue-500';
    case 'lead':
      return 'text-purple-500';
    case 'campaign':
      return 'text-orange-500';
    default:
      return 'text-green-500';
  }
};

const RealTimeActivity = () => {
  const [currentActivities, setCurrentActivities] = useState<Activity[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Add initial activity
    const addActivity = () => {
      const randomActivity = activities[Math.floor(Math.random() * activities.length)];
      const newActivity: Activity = {
        ...randomActivity,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date()
      };

      setCurrentActivities(prev => {
        const updated = [newActivity, ...prev].slice(0, 3); // Keep only last 3
        return updated;
      });
    };

    // Add first activity immediately
    addActivity();

    // Then add new activities every 4-6 seconds
    const interval = setInterval(() => {
      addActivity();
    }, Math.random() * 2000 + 4000); // 4-6 seconds

    return () => clearInterval(interval);
  }, []);

  if (!isVisible || currentActivities.length === 0) return null;

  return (
    <div className="fixed top-6 right-6 z-40 max-w-sm">
      <div className="space-y-2">
        {currentActivities.map((activity, index) => {
          const Icon = getActivityIcon(activity.type);
          const colorClass = getActivityColor(activity.type);
          
          return (
            <div
              key={activity.id}
              className={`bg-card/95 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-lg transition-all duration-500 animate-fade-in ${
                index === 0 ? 'scale-100' : 'scale-95 opacity-80'
              }`}
              style={{
                transform: `translateY(${index * 4}px)`,
              }}
            >
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 ${colorClass}`}>
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground leading-snug">
                    {activity.message}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <span>{activity.location}</span>
                    <span>•</span>
                    <span>agora mesmo</span>
                  </div>
                </div>

                {index === 0 && (
                  <button
                    onClick={() => setIsVisible(false)}
                    className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors opacity-60 hover:opacity-100"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Activity indicator dot */}
              <div className="absolute -left-1 top-1/2 transform -translate-y-1/2">
                <div className={`w-2 h-2 ${colorClass.replace('text-', 'bg-')} rounded-full`}>
                  <div className={`w-2 h-2 ${colorClass.replace('text-', 'bg-')} rounded-full animate-ping opacity-75`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RealTimeActivity;