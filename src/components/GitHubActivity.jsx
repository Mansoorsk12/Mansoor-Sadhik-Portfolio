
import { useEffect, useState } from 'react';
import { Code2, ArrowUpRight, GitBranch, Star } from 'lucide-react';
import { profile, projects } from '../data/portfolio';

export default function GitHubActivity() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 10000);

    Promise.all([
      fetch('https://api.github.com/users/Mansoorsk12', {
        signal: controller.signal,
      }),
      fetch(
        'https://api.github.com/users/Mansoorsk12/repos?sort=updated&per_page=4',
        { signal: controller.signal }
      ),
    ])
      .then(async (responses) => {
        if (responses.some((response) => !response.ok)) {
          throw new Error('Failed to fetch GitHub data');
        }

        const [user, repos] = await Promise.all(
          responses.map((response) => response.json())
        );

        if (
          !Array.isArray(repos) ||
          typeof user.public_repos !== 'number'
        ) {
          throw new Error('Invalid GitHub response');
        }

        setData({ user, repos });
        setStatus('live');
      })
      .catch(() => {
        setStatus('fallback');
      })
      .finally(() => {
        clearTimeout(timeout);
      });

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const repositories =
    data?.repos ||
    projects.slice(0, 4).map((project) => ({
      name: project.repo,
      html_url: `${profile.github}/${project.repo}`,
    }));

  return (
    <div className="github-block">
      <div className="github-heading">
        <div>
          <Code2 size={25} />
          <h3>
            Always building.
            <br />
            <span>Always learning.</span>
          </h3>
        </div>

        <a
          className="text-link"
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub profile <ArrowUpRight size={16} />
        </a>
      </div>

      <div className="github-meta">
        <span
          className={`live-dot ${status === 'live' ? 'online' : ''}`}
        />

        {status === 'live'
          ? `${data.user.public_repos} public repositories · Live GitHub data`
          : status === 'loading'
            ? 'Connecting to GitHub…'
            : 'Selected repositories · Live data unavailable'}
      </div>

      <div className="github-repos">
        {repositories.map((repo) => (
          <a
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitBranch size={17} />

            <strong>{repo.name}</strong>

            {repo.language && <small>{repo.language}</small>}

            {typeof repo.stargazers_count === 'number' && (
              <small>
                <Star size={12} />
                {repo.stargazers_count}
              </small>
            )}

            <ArrowUpRight size={15} />
          </a>
        ))}
      </div>
    </div>
  );
}
