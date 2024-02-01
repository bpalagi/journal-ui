import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ChatbotUIContext } from "@/context/context"
import { CollectionPrompt } from "@/types/collection-prompt"
import { IconChevronDown, IconCircleCheckFilled } from "@tabler/icons-react"
import { FC, useContext, useEffect, useRef, useState } from "react"

interface CollectionPromptPickerProps {
  selectedCollectionPrompts: CollectionPrompt[]
  onCollectionPromptSelect: (prompt: CollectionPrompt) => void
}

export const CollectionPromptPicker: FC<CollectionPromptPickerProps> = ({
  selectedCollectionPrompts,
  onCollectionPromptSelect
}) => {
  const { prompts } = useContext(ChatbotUIContext)

  const inputRef = useRef<HTMLInputElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100) // FIX: hacky
    }
  }, [isOpen])

  const handlePromptSelect = (prompt: CollectionPrompt) => {
    onCollectionPromptSelect(prompt)
  }

  if (!prompts) return null

  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={isOpen => {
        setIsOpen(isOpen)
        setSearch("")
      }}
    >
      <DropdownMenuTrigger
        className="bg-background w-full justify-start border-2 px-3 py-5"
        asChild
      >
        <Button
          ref={triggerRef}
          className="flex items-center justify-between"
          variant="ghost"
        >
          <div className="flex items-center">
            <div className="ml-2 flex items-center">
              {selectedCollectionPrompts.length} prompts selected
            </div>
          </div>

          <IconChevronDown />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        style={{ width: triggerRef.current?.offsetWidth }}
        className="space-y-2 overflow-auto p-2"
        align="start"
      >
        <Input
          ref={inputRef}
          placeholder="Search prompts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => e.stopPropagation()}
        />

        {selectedCollectionPrompts
          .filter(prompt =>
            prompt.name.toLowerCase().includes(search.toLowerCase())
          )
          .map(prompt => (
            <CollectionPromptItem
              key={prompt.id}
              prompt={prompt}
              selected={selectedCollectionPrompts.some(
                selectedCollectionPrompt =>
                  selectedCollectionPrompt.id === prompt.id
              )}
              onSelect={handlePromptSelect}
            />
          ))}

        {prompts
          .filter(
            prompt =>
              !selectedCollectionPrompts.some(
                selectedCollectionPrompt =>
                  selectedCollectionPrompt.id === prompt.id
              ) && prompt.name.toLowerCase().includes(search.toLowerCase())
          )
          .map(prompt => (
            <CollectionPromptItem
              key={prompt.id}
              prompt={prompt}
              selected={selectedCollectionPrompts.some(
                selectedCollectionPrompt =>
                  selectedCollectionPrompt.id === prompt.id
              )}
              onSelect={handlePromptSelect}
            />
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface CollectionPromptItemProps {
  prompt: CollectionPrompt
  selected: boolean
  onSelect: (prompt: CollectionPrompt) => void
}

const CollectionPromptItem: FC<CollectionPromptItemProps> = ({
  prompt,
  selected,
  onSelect
}) => {
  const handleSelect = () => {
    onSelect(prompt)
  }

  return (
    <div
      className="flex cursor-pointer items-center justify-between py-0.5 hover:opacity-50"
      onClick={handleSelect}
    >
      <div className="flex grow items-center truncate">
        <div className="truncate">{prompt.name}</div>
      </div>

      {selected && (
        <IconCircleCheckFilled size={20} className="min-w-[30px] flex-none" />
      )}
    </div>
  )
}
